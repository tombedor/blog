# Source Note: Chart Data

## Classified Revenue

- Sparse nominal revenue points from NAA-based sources; use as historical shape, not a complete annual series.
- 1990: $11.5B; 1999: $18.6B; 2000 peak: $19.6B; 2005: $17.3B; 2007: $14.2B; 2009: $6.2B; 2011: ~$5B; 2012: $4.6B.
- Sources:
  - https://www.newstarbooks.com/pdfs/books/9781554201020-GreatlyExaggerated-web.pdf
  - https://www.mediapost.com/publications/article/11138/ad-spending-in-newspapers-hit-487-billion-in-200.html
  - https://www.mediapost.com/publications/article/142129/2000-2010-the-decade-that-killed-newspaper-clas.html
  - https://www.mediapost.com/publications/article/171052/newspaper-ad-spending-now-half-what-it-was-in-2005.html

## NYC Taxi / Uber Rides

- Data generated from Todd Schneider's dashboard API, which aggregates TLC monthly indicators and FHV base/trip reports. The retrieved data was current through April 30, 2026.
- Rides chart: annual average trips per day per 1,000 NYC residents, 2015-2025, for yellow taxis, Uber, and their combined total; 2026 is the January-April trip average divided by the latest available population estimate (2025). The total excludes Lyft, green taxis, and traditional FHVs.
- Population denominators use Census Vintage 2019 estimates for 2015-2019 and Vintage 2025 estimates for 2020-2025. The chart directory retains `raw-trips.csv` and `population.csv` alongside the normalized `data.csv`.
- Sources:
  - https://toddwschneider.com/dashboards/nyc-taxi-ridehailing-uber-lyft-data/
  - https://taxi.toddwschneider.com/dashboard_data.json
  - https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page
  - https://www2.census.gov/programs-surveys/popest/tables/2010-2019/cities/totals/SUB-IP-EST2019-ANNRNK.xlsx
  - https://www.census.gov/data/tables/time-series/demo/popest/2020s-total-cities-and-towns.html
