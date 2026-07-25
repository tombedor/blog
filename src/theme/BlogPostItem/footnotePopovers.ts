// Footnote references normally jump the page to an anchor at the very
// bottom of the post, which loses your reading position. Intercept clicks
// on them and show the footnote text in a small popover near the marker
// instead — the link's href/id stay intact, so this degrades gracefully to
// the normal jump-to-anchor behavior if JS doesn't run.
export function initFootnotePopovers(root: ParentNode): () => void {
  const refs = Array.from(
    root.querySelectorAll<HTMLAnchorElement>('a[data-footnote-ref="true"]'),
  );
  if (refs.length === 0) {
    return () => {};
  }

  let activePopover: HTMLDivElement | null = null;
  let activeRef: HTMLAnchorElement | null = null;

  function closePopover() {
    activePopover?.remove();
    activePopover = null;
    activeRef?.setAttribute('aria-expanded', 'false');
    activeRef = null;
  }

  function openPopover(ref: HTMLAnchorElement) {
    const targetId = ref.getAttribute('href')?.slice(1);
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) {
      return;
    }

    closePopover();

    const popover = document.createElement('div');
    popover.className = 'footnote-popover';
    popover.setAttribute('role', 'note');

    const clone = target.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('[data-footnote-backref]').forEach((el) => el.remove());
    popover.innerHTML = clone.innerHTML;

    document.body.appendChild(popover);

    // Positioned in document coordinates (not viewport-fixed), so it stays
    // correctly aligned with its footnote marker as the page scrolls —
    // there's no need to track scroll to keep it "attached."
    const refRect = ref.getBoundingClientRect();
    const popRect = popover.getBoundingClientRect();
    const minLeft = window.scrollX + 8;
    const maxLeft = window.scrollX + document.documentElement.clientWidth - popRect.width - 8;
    let left = refRect.left + window.scrollX - popRect.width / 2 + refRect.width / 2;
    left = Math.max(minLeft, Math.min(left, maxLeft));
    const top = refRect.bottom + window.scrollY + 8;

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;

    ref.setAttribute('aria-expanded', 'true');
    activePopover = popover;
    activeRef = ref;
  }

  function onRefClick(event: MouseEvent) {
    const ref = event.currentTarget as HTMLAnchorElement;
    event.preventDefault();
    if (activeRef === ref) {
      closePopover();
    } else {
      openPopover(ref);
    }
  }

  function onDocumentClick(event: MouseEvent) {
    if (!activePopover) {
      return;
    }
    const target = event.target as Node;
    if (activePopover.contains(target) || activeRef?.contains(target)) {
      return;
    }
    closePopover();
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closePopover();
    }
  }

  refs.forEach((ref) => {
    ref.setAttribute('aria-expanded', 'false');
    ref.addEventListener('click', onRefClick);
  });
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onKeydown);
  // A viewport resize can invalidate the left-position clamp (e.g. rotating
  // a phone); scroll doesn't need the same treatment (see above).
  window.addEventListener('resize', closePopover);

  return () => {
    closePopover();
    refs.forEach((ref) => ref.removeEventListener('click', onRefClick));
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('resize', closePopover);
  };
}
