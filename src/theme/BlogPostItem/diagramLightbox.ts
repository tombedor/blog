export function initDiagramLightbox(root: ParentNode): () => void {
  const diagrams = Array.from(
    root.querySelectorAll<HTMLImageElement>('img'),
  ).filter((image) => !image.closest('a'));

  if (diagrams.length === 0) {
    return () => {};
  }

  let overlay: HTMLDivElement | null = null;
  let activeImage: HTMLImageElement | null = null;
  let previousBodyOverflow = '';

  function closeLightbox() {
    if (!overlay) {
      return;
    }

    overlay.remove();
    overlay = null;
    document.body.style.overflow = previousBodyOverflow;
    activeImage?.focus({preventScroll: true});
    activeImage = null;
  }

  function openLightbox(source: HTMLImageElement) {
    closeLightbox();

    activeImage = source;
    previousBodyOverflow = document.body.style.overflow;

    const dialog = document.createElement('div');
    dialog.className = 'diagram-lightbox';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute(
      'aria-label',
      source.alt ? `Expanded diagram: ${source.alt}` : 'Expanded diagram',
    );

    const expandedImage = document.createElement('img');
    expandedImage.className = 'diagram-lightbox__image';
    expandedImage.src = source.currentSrc || source.src;
    expandedImage.alt = source.alt;

    const closeButton = document.createElement('button');
    closeButton.className = 'diagram-lightbox__close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close expanded diagram');
    closeButton.textContent = '×';

    dialog.append(expandedImage, closeButton);
    document.body.appendChild(dialog);
    document.body.style.overflow = 'hidden';
    overlay = dialog;
    closeButton.focus({preventScroll: true});

    closeButton.addEventListener('click', closeLightbox);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog || event.target === expandedImage) {
        closeLightbox();
      }
    });
  }

  function onDiagramClick(event: MouseEvent) {
    openLightbox(event.currentTarget as HTMLImageElement);
  }

  function onDiagramKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    event.preventDefault();
    openLightbox(event.currentTarget as HTMLImageElement);
  }

  function onDocumentKeydown(event: KeyboardEvent) {
    if (!overlay) {
      return;
    }
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      overlay.querySelector<HTMLButtonElement>('button')?.focus();
    }
  }

  diagrams.forEach((diagram) => {
    diagram.classList.add('diagram-lightbox-trigger');
    diagram.tabIndex = 0;
    diagram.setAttribute('role', 'button');
    diagram.setAttribute(
      'aria-label',
      diagram.alt ? `Expand diagram: ${diagram.alt}` : 'Expand diagram',
    );
    diagram.addEventListener('click', onDiagramClick);
    diagram.addEventListener('keydown', onDiagramKeydown);
  });
  document.addEventListener('keydown', onDocumentKeydown);

  return () => {
    const imageToRestore = activeImage;
    closeLightbox();
    imageToRestore?.blur();
    diagrams.forEach((diagram) => {
      diagram.classList.remove('diagram-lightbox-trigger');
      diagram.removeAttribute('tabindex');
      diagram.removeAttribute('role');
      diagram.removeAttribute('aria-label');
      diagram.removeEventListener('click', onDiagramClick);
      diagram.removeEventListener('keydown', onDiagramKeydown);
    });
    document.removeEventListener('keydown', onDocumentKeydown);
  };
}
