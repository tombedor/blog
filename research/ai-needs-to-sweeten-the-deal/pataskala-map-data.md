# Pataskala Map Data and Methodology

## Case

Pataskala voters considered a charter amendment prohibiting construction of data centers with aggregate demand above 25 MW. Earlier in 2026, Aligned Data Centers sought approval for four data-center structures on parcel `063-141426-00.000`, approximately 89.7 acres at the southeast corner of Broad Street SW and Mink Street SW.

Primary project record:
- https://cityofpataskalaohio.gov/api/blob/viewBlob?i=eZK6lWWbeSOhj6uHZ3bwJ4%2FEzD7c8wXudB9o2c5fXLvbxL%2F9KwtT7raTLwvUs9fv

Official election results:
- https://www.boe.ohio.gov/licking/c/elecres/20261103precinct.pdf
- Report is the November 4 unofficial canvass; Ohio’s certification deadline is November 24, 2026.

## Precinct Results

| Precinct | Yes: prohibit | No | Yes share |
|---|---:|---:|---:|
| Pataskala 1-A | 607 | 165 | 78.63% |
| Pataskala 1-B | 938 | 368 | 71.82% |
| Pataskala 2-A | 691 | 220 | 75.85% |
| Pataskala 2-B | 565 | 185 | 75.33% |
| Pataskala 3-A | 677 | 216 | 75.81% |
| Pataskala 3-B | 872 | 359 | 70.84% |
| Pataskala 4-A | 424 | 153 | 73.48% |
| Pataskala 4-B | 644 | 275 | 70.08% |
| **Citywide** | **5,418** | **1,941** | **73.62%** |

## GIS Sources

- Current BOE precinct polygons, revised November 3, 2026: https://gis.lickingcounty.gov/server/rest/services/Auditor/Boundaries/FeatureServer/2
- Parcel polygons: https://gis.lickingcounty.gov/server/rest/services/Auditor/ParcelsSearch/FeatureServer/0
- Parcel query confirms owner `ALIGNED DATA CENTERS (PATASKALA) PROPCO LLC`, address `6771 MINK ST`, and 89.678 acres.
- Parcel centroid: `-82.7261961, 39.9911248`. A spatial intersection against the BOE layer places it in Pataskala 1-B.

## Rough Distance Check

Distances below use straight-line distance between the project parcel centroid and each geographic precinct centroid. They describe polygons poorly when precincts are large or irregular and should not be treated as voter-level exposure.

| Precinct | Approx. centroid distance | Yes share |
|---|---:|---:|
| 1-B | 0.72 mi | 71.82% |
| 1-A | 1.33 mi | 78.63% |
| 3-A | 1.87 mi | 75.81% |
| 2-B | 2.07 mi | 75.33% |
| 4-A | 2.51 mi | 73.48% |
| 2-A | 3.04 mi | 75.85% |
| 4-B | 3.42 mi | 70.08% |
| 3-B | 3.62 mi | 70.84% |

Pearson correlation between centroid distance and yes share is approximately `-0.45`: support tends to decline with distance in this tiny sample, but the host precinct is less supportive than four more-distant precincts. Do not present the coefficient as a reliable estimate.

## Map Specification

- Choropleth: precinct fill = yes share, explicitly labeled 70%–80% sequential scale.
- Overlay: project parcel with a thick contrasting outline and label “Proposed Aligned data center.”
- Orientation: label Broad Street and Mink Street; mute areas outside Pataskala.
- Annotation: “All eight precincts supported the ban.”
- Optional inset: distance-versus-support scatterplot with an eight-precinct warning.
- Preserve editable inputs alongside the export: precinct GeoJSON, parcel GeoJSON, results CSV, and generated `.excalidraw` scene.
