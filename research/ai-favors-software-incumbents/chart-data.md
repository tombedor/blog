# Source Note: Chart Data

## American Express Travel Volume

- The chart compares gross travel sales / total transaction value rather than revenue. A continuous revenue series would be misleading because the pre-2014 business was reported inside American Express's broader Travel Related Services segment, then moved into a joint venture and later acquired other travel-management companies.
- 1995: American Express reported $15.1B of travel sales. CPI-U annual averages of 152.4 in 1995 and 321.943 in 2025 convert this to $31.9B in 2025 dollars.
- 2019: Legacy GBT reported $27.7B of TTV, excluding the later Egencia and Ovation acquisitions. CPI-U of 255.657 converts this to $34.9B in 2025 dollars.
- 2025: Amex GBT reported approximately $36.3B of TTV. This includes a changed reporting perimeter, including acquired businesses.
- Scope caveat: the 1995 American Express "travel sales" figure covered its broader corporate and consumer travel operation; 2019 and 2025 GBT figures are business travel. The comparison supports survival at similar real scale, not organic growth or a like-for-like revenue trend.
- Sources:
  - https://www.sec.gov/Archives/edgar/data/4962/0000004962-96-000013.txt
  - https://www.sec.gov/Archives/edgar/data/1820872/000110465922080636/tm2216855-3_s1a.htm
  - https://www.sec.gov/Archives/edgar/data/1820872/000162828026015817/gbtg-20251231.htm
  - https://www.bls.gov/cpi/data.htm

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
