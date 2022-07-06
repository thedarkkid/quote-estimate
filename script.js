/** ID of location select tag **/
const LOCATION_SELECT_ID = 'city';

/** ID of parcel type select tag **/
const PARCEL_TYPE_SELECT_ID = 'parcel_type';

/** name property of weight radio tag **/
const WEIGHT_RADIO_NAME = 'weight';

/** Data Object **/
const data = { basePrice: 0, journeyRatio: 0, parcelWeight: 0 };

/**
 * Function to calculate price of the delivery;
 * @returns {number|string}
 */
const calculateFee = () => {
  for (const key of Object.keys(data)) {
    if (!data[key]) return '';
  }
  return (data.basePrice * (1 + data.journeyRatio) * (1 + data.parcelWeight)) ?? '';
};

/**
 * Main Function that runs the page;
 * @param locations
 * @param parcels
 */
const init = ([locations, parcels]) => {

  function createOption (title, value) {
    const opt = document.createElement('option');
    opt.value = value;
    opt.innerText = title;
    return opt;
  }

  const locationSelect = document.querySelector(`select#${LOCATION_SELECT_ID}`);
  const parcelTypeSelect = document.querySelector(`select#${PARCEL_TYPE_SELECT_ID}`);

  function addOptionsToSelect (select, options) {
    for (const option of options) select.append(option);
  }

  addOptionsToSelect(locationSelect, locations.map(l => createOption(l.name, l.price)));
  addOptionsToSelect(parcelTypeSelect, parcels.map(p => createOption(p.name, +p.numerator / +p.denominator)));

  const addChangeListener = (element, updateVal, action) => {
    element.addEventListener('change', (ev) => {
      data[updateVal] = !!ev.target.value ? parseFloat(ev.target.value) : 0;
      action && action();
    });
  };

  const onDataChange = () =>
    document.querySelector('span.price_result')
      .innerHTML = '$' + calculateFee();

  addChangeListener(locationSelect, 'basePrice', onDataChange);
  addChangeListener(parcelTypeSelect, 'journeyRatio', onDataChange);
  document.querySelectorAll(`input[name=${WEIGHT_RADIO_NAME}]`)
    .forEach(el => addChangeListener(el, 'parcelWeight', onDataChange));
};

/**
 * Fetches Json Files, returns a Json file.
 * @param route
 * @returns {Promise<json>}
 */
function fetchJsonFile (route) {
  return fetch(route)
    .then(res => res.json());
}

/**
 * Script entry point, there are better ways to do this;
 * but this is what I have for now.
 */
fetchJsonFile('data/locations.json')
  .then(locations => {
    fetchJsonFile('data/parcels.json')
      .then(parcels => {
        init([locations, parcels]);
      });
  });
