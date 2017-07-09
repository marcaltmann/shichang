const schema = [
  ['_euro',                                       'string'],
  ['id',                                          'string'],
  ['title',                                       'string'],
  ['categories',                                  'array'],
  ['condition',                                   'string'],
  ['condition_extra',                             'string'],
  ['content',                                     'string'],
  ['quantity',                                    'number'],
  ['price_cents',                                 'number'],
  ['basic_price_cents',                           'number'],
  ['basic_price_amount',                          'string'],
  ['vat',                                         'number'],
  ['external_title_image_url',                    'string'],
  ['image_2_url',                                 'string'],
  ['transport_pickup',                            'bool'],
  ['transport_type1',                             'bool'],
  ['transport_type1_provider',                    'string'],
  ['transport_type1_price_cents',                 'number'],
  ['transport_type1_number',                      'number'],
  ['transport_type2',                             'bool'],
  ['transport_type2_provider',                    'string'],
  ['transport_type2_price_cents',                 'number'],
  ['transport_type2_number',                      'number'],
  ['transport_time',                              'string'],
  ['transport_details',                           'string'],
  ['unified_transport',                           'bool'],
  ['payment_bank_transfer',                       'bool'],
  ['payment_cash',                                'bool'],
  ['payment_paypal',                              'bool'],
  ['payment_cash_on_delivery',                    'bool'],
  ['payment_cash_on_delivery_price_cents',        'number'],
  ['payment_invoice',                             'bool'],
  ['payment_details',                             'string'],
  ['fair_kind',                                   'string'],
  ['fair_seal',                                   'string'],
  ['support',                                     'bool'],
  ['support_checkboxes',                          'string'],
  ['support_other',                               'string'],
  ['support_explanation',                         'string'],
  ['labor_conditions',                            'bool'],
  ['labor_conditions_checkboxes',                 'string'],
  ['labor_conditions_other',                      'string'],
  ['labor_conditions_explanation',                'string'],
  ['environment_protection',                      'bool'],
  ['environment_protection_checkboxes',           'string'],
  ['environment_protection_other',                'string'],
  ['environment_protection_explanation',          'string'],
  ['controlling',                                 'bool'],
  ['controlling_checkboxes',                      'string'],
  ['controlling_other',                           'string'],
  ['controlling_explanation',                     'string'],
  ['awareness_raising',                           'bool'],
  ['awareness_raising_checkboxes',                'string'],
  ['awareness_raising_other',                     'string'],
  ['awareness_raising_explanation',               'string'],
  ['nonprofit_association',                       'bool'],
  ['nonprofit_association_checkboxes',            'string'],
  ['social_businesses_muhammad_yunus',            'bool'],
  ['social_businesses_muhammad_yunus_checkboxes', 'string'],
  ['social_entrepreneur',                         'bool'],
  ['social_entrepreneur_checkboxes',              'string'],
  ['social_entrepreneur_explanation',             'string'],
  ['ecologic_seal',                               'string'],
  ['upcycling_reason',                            'string'],
  ['small_and_precious_eu_small_enterprise',      'bool'],
  ['small_and_precious_reason',                   'string'],
  ['small_and_precious_handmade',                 'bool'],
  ['gtin',                                        'string'],
  ['custom_seller_identifier',                    'string'],
  ['action',                                      'string'],
];

const parse = require('csv-parse/lib/sync');

function csvToDocuments(csvData) {
  let objects = parse(csvData, { delimiter: ';' });
  let documents = makeDocuments(objects);
  return documents;
}

function makeDocuments(csvArrays) {
  let documents = [];
  csvArrays.shift();

  csvArrays.forEach((array) => {
    let doc = {};
    schema.forEach((schemaPart, i) => {
      let key = schemaPart[0];
      let dataType = schemaPart[1];
      let value = array[i];

      let convertedValue;
      switch(dataType) {
      case 'number':
        convertedValue = parseInt(value, 10);
        break;
      case 'bool':
        if (value === 'true') {
          convertedValue = true;
        } else {
          convertedValue = false;
        }
        break;
      case 'array':
        convertedValue = value.split(',');
        convertedValue = convertedValue.map(v => parseInt(v, 10));
        break;
      case 'string':
      default:
        convertedValue = value;
      }

      doc[key] = convertedValue;
    });
    documents.push(doc);
  });

  return documents;
}

module.exports = csvToDocuments;
