import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

data = [
    {"model": "GPT-3.5",          "provider": "OpenAI",    "months": 9,  "os_model": "Llama 2 70B",     "date": "Nov '22"},
    {"model": "GPT-4",             "provider": "OpenAI",    "months": 16, "os_model": "Llama 3.1 405B",  "date": "Mar '23"},
    {"model": "Claude 3 Opus",     "provider": "Anthropic", "months": 4,  "os_model": "Llama 3.1 405B",  "date": "Mar '24"},
    {"model": "GPT-4o",            "provider": "OpenAI",    "months": 7,  "os_model": "DeepSeek-V3",     "date": "May '24"},
    {"model": "Claude 3.5 Sonnet", "provider": "Anthropic", "months": 6,  "os_model": "DeepSeek-V3",     "date": "Jun '24"},
    {"model": "o1",                "provider": "OpenAI",    "months": 4,  "os_model": "DeepSeek-R1",     "date": "Sep '24"},
]

COLORS = {"OpenAI": "#1971c2", "Anthropic": "#e67700"}

labels = [f"{d['model']}\n{d['date']}" for d in data]
months = [d["months"] for d in data]
colors = [COLORS[d["provider"]] for d in data]
os_models = [d["os_model"] for d in data]

fig, ax = plt.subplots(figsize=(10, 5.5))
fig.patch.set_facecolor("white")
ax.set_facecolor("white")

x = np.arange(len(data))
bars = ax.bar(x, months, color=colors, width=0.5, zorder=3)

# Gridlines behind bars
ax.set_axisbelow(True)
ax.yaxis.grid(True, color="#e9ecef", linewidth=0.8)
ax.set_axisbelow(True)

# GPT-4 reference line
ax.axhline(y=16, color="#ced4da", linewidth=1, linestyle="--", zorder=2)

# OS model names above bars
for bar, os_model in zip(bars, os_models):
    ax.text(
        bar.get_x() + bar.get_width() / 2,
        bar.get_height() + 0.3,
        os_model,
        ha="center", va="bottom",
        fontsize=8.5, color="#868e96",
        style="italic",
    )

# GPT-4 annotation
ax.annotate(
    "GPT-4: open weights\nhadn't yet scaled",
    xy=(1, 16), xytext=(1.6, 14.5),
    fontsize=8, color="#adb5bd",
    arrowprops=dict(arrowstyle="->", color="#ced4da", lw=0.8),
    va="top",
)

# Axes
ax.set_xticks(x)
ax.set_xticklabels(labels, fontsize=10)
ax.set_ylabel("Months until open source matched", fontsize=10, color="#495057")
ax.set_ylim(0, 20)
ax.set_yticks([0, 4, 8, 12, 16])
ax.tick_params(axis="both", color="#dee2e6")
for spine in ax.spines.values():
    spine.set_edgecolor("#dee2e6")
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)

# Title
ax.set_title("Months to open source parity", fontsize=13, fontweight="bold", color="#212529", pad=14)

# Legend
legend_handles = [
    mpatches.Patch(color=COLORS["OpenAI"], label="OpenAI"),
    mpatches.Patch(color=COLORS["Anthropic"], label="Anthropic"),
]
ax.legend(handles=legend_handles, fontsize=9, framealpha=0, loc="upper right")

plt.tight_layout()
out = "static/diagrams/open-source-models/parity-chart.png"
plt.savefig(out, dpi=180, bbox_inches="tight")
print(f"Saved to {out}")
