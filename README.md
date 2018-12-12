# Google Hotel Price Scraper
An API that takes the following as input
* hotelName: <String>
* checkInDate: <Date in YYYY-MM-DD>
* duration: <Number>

And returns a JSON of the form:
```json
{
{
id:0
siteName:<Name>
siteURL:<URL>
price:<Number>
}
.
.
}
```

### A sample cURL request will be of the form
```sh
curl -X POST \
  http://localhost:3000 \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'cache-control: no-cache' \
  -d 'duration=7&checkInDate=2019-01-17&hotelName=itc%20maurya'
```

### Prerequisites
* Phantomjs
* node>8.x

### Methodology
Used a headless browser to fetch the google search page for a hotel. Other libraries like request or x-ray won't work in this case since the data fetched using those modules would not have the RHS component which shows the prices.
Exploited the `lhpr-content-item` tag and fetched the `href` and `span` to get Hotel's URI, name and price for the given dates and duration.
