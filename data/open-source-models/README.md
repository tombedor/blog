Datasets for charts in open-source-models.mdx. Populate with real values and cite sources in the CSVs.

Notes
- Primary sources preferred; secondary sources (Wikipedia, spec aggregators) are used for device RAM and memory bandwidth.
- Memory bandwidth values are taken from secondary sources; iPhone 16 Pro bandwidth is derived using Apple’s +17% claim over the prior generation.
- `iphone-max-usable-model.csv` is estimated from RAM and bandwidth with explicit assumptions and should be labeled as an estimate.
- `frontier-leads.csv` is a draft dataset for a possible frontier-vs-frontier lead-duration chart. It uses reported public SWE-bench Verified numbers where possible; ongoing rows are lower bounds and should be labeled as such.
- Run `scripts/sync-data-to-static.sh` after edits so charts can load `/data/...` from the site.
