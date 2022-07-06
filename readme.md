# Quote Calculator Project Sample

This is a simple project to calculate the price of a parcel
delivery based on location, parcel type and parcel weight.
It, has no css, for use the css should be modified to fit taste.

<b>NB: *NO CLASS NAMES SHOULD BE CHANGED* </b>
*as that could mess with the selectors in the script file.*

### Adding Locations

In order to add a new location, modify `data/locations.json`
and add a new location. A new location looks like: <br />

~~~json
{
  "name": "<location-name>",
  "price": "<base-location-price>"
}
~~~

### Adding Parcel Types

In order to add a new location, modify `data/parcels.json`
and add a new location. A new location looks like: <br />

~~~json
{
  "name": "Box",
  "numerator": 2,
  "denominator": 5
}
~~~
The parcel type takes a `journeyRatio`, the larger the ratio,
the more expensive the trip, the journey ratio is calculated by 
`numerator/denominator`.

### init()
In `script.js` there is a `calculateFee()` method that houses all the event listeners and 
functions to manipulate the DOM. 

### calculateFee()
In `script.js` there is a `calculateFee()` method that controls how
the fee is calculated, using the selected data.
This is where you'd modify how the quote fee is calculated.