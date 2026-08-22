export interface TrimOption {
  name: string;
  trimSlug: string;
  engine?: string;
  horsepower?: number;
  priceMultiplier: number;
}

export interface ModelOption {
  name: string;
  modelSlug: string;
  bodyType: string;
  generation?: string;
  trims: TrimOption[];
}

export interface MakeOption {
  name: string;
  makeSlug: string;
  models: ModelOption[];
}

export const VEHICLE_HIERARCHY: MakeOption[] = [
  {
    name: 'Porsche', makeSlug: 'porsche',
    models: [
      { name: '911', modelSlug: '911', bodyType: 'Sports Car', generation: '992', trims: [
        { name: 'Carrera', trimSlug: 'carrera', engine: '3.0L Twin-Turbo Flat-6', horsepower: 385, priceMultiplier: 1 },
        { name: 'Carrera T', trimSlug: 'carrera-t', engine: '3.0L Twin-Turbo Flat-6', horsepower: 385, priceMultiplier: 1.05 },
        { name: 'Carrera S', trimSlug: 'carrera-s', engine: '3.0L Twin-Turbo Flat-6', horsepower: 450, priceMultiplier: 1.15 },
        { name: 'Carrera 4S', trimSlug: 'carrera-4s', engine: '3.0L Twin-Turbo Flat-6', horsepower: 450, priceMultiplier: 1.2 },
        { name: 'Carrera GTS', trimSlug: 'carrera-gts', engine: '3.0L Twin-Turbo Flat-6', horsepower: 480, priceMultiplier: 1.35 },
        { name: 'Turbo', trimSlug: 'turbo', engine: '3.8L Twin-Turbo Flat-6', horsepower: 580, priceMultiplier: 1.6 },
        { name: 'Turbo S', trimSlug: 'turbo-s', engine: '3.8L Twin-Turbo Flat-6', horsepower: 650, priceMultiplier: 1.85 },
        { name: 'GT3', trimSlug: 'gt3', engine: '4.0L Flat-6', horsepower: 510, priceMultiplier: 1.5 },
        { name: 'GT3 Touring', trimSlug: 'gt3-touring', engine: '4.0L Flat-6', horsepower: 510, priceMultiplier: 1.55 },
        { name: 'GT3 RS', trimSlug: 'gt3-rs', engine: '4.0L Flat-6', horsepower: 525, priceMultiplier: 2 },
      ]},
      { name: 'Cayenne', modelSlug: 'cayenne', bodyType: 'SUV', generation: 'E3', trims: [
        { name: 'Cayenne', trimSlug: 'base', engine: '3.0L V6 Turbo', horsepower: 353, priceMultiplier: 1 },
        { name: 'Cayenne E-Hybrid', trimSlug: 'e-hybrid', engine: '3.0L V6 Turbo + Electric', horsepower: 462, priceMultiplier: 1.1 },
        { name: 'Cayenne S', trimSlug: 's', engine: '2.9L V6 Twin-Turbo', horsepower: 440, priceMultiplier: 1.2 },
        { name: 'Cayenne GTS', trimSlug: 'gts', engine: '4.0L V8 Twin-Turbo', horsepower: 460, priceMultiplier: 1.4 },
        { name: 'Cayenne Turbo GT', trimSlug: 'turbo-gt', engine: '4.0L V8 Twin-Turbo', horsepower: 640, priceMultiplier: 1.8 },
      ]},
      { name: 'Macan', modelSlug: 'macan', bodyType: 'SUV', trims: [
        { name: 'Macan', trimSlug: 'base', engine: '2.0L I4 Turbo', horsepower: 265, priceMultiplier: 1 },
        { name: 'Macan S', trimSlug: 's', engine: '2.9L V6 Twin-Turbo', horsepower: 380, priceMultiplier: 1.2 },
        { name: 'Macan GTS', trimSlug: 'gts', engine: '2.9L V6 Twin-Turbo', horsepower: 440, priceMultiplier: 1.4 },
      ]},
      { name: 'Panamera', modelSlug: 'panamera', bodyType: 'Sedan', trims: [
        { name: 'Panamera', trimSlug: 'base', engine: '2.9L V6 Twin-Turbo', horsepower: 353, priceMultiplier: 1 },
        { name: 'Panamera 4S', trimSlug: '4s', engine: '2.9L V6 Twin-Turbo', horsepower: 440, priceMultiplier: 1.2 },
        { name: 'Panamera GTS', trimSlug: 'gts', engine: '4.0L V8 Twin-Turbo', horsepower: 500, priceMultiplier: 1.4 },
        { name: 'Turbo S E-Hybrid', trimSlug: 'turbo-s-e-hybrid', engine: '4.0L V8 + Electric', horsepower: 700, priceMultiplier: 1.8 },
      ]},
      { name: 'Taycan', modelSlug: 'taycan', bodyType: 'Sedan', generation: 'Electric', trims: [
        { name: 'Taycan', trimSlug: 'base', engine: 'Electric Dual Motor', horsepower: 402, priceMultiplier: 1 },
        { name: 'Taycan 4S', trimSlug: '4s', engine: 'Electric Dual Motor', horsepower: 562, priceMultiplier: 1.2 },
        { name: 'Taycan Turbo', trimSlug: 'turbo', engine: 'Electric Dual Motor', horsepower: 670, priceMultiplier: 1.5 },
        { name: 'Taycan Turbo S', trimSlug: 'turbo-s', engine: 'Electric Dual Motor', horsepower: 751, priceMultiplier: 1.8 },
      ]},
    ]
  },
  {
    name: 'BMW', makeSlug: 'bmw',
    models: [
      { name: 'M3', modelSlug: 'm3', bodyType: 'Sedan', generation: 'G80', trims: [
        { name: 'M3', trimSlug: 'base', engine: '3.0L I6 Twin-Turbo', horsepower: 480, priceMultiplier: 1 },
        { name: 'M3 Competition', trimSlug: 'competition', engine: '3.0L I6 Twin-Turbo', horsepower: 510, priceMultiplier: 1.15 },
        { name: 'M3 CS', trimSlug: 'cs', engine: '3.0L I6 Twin-Turbo', horsepower: 550, priceMultiplier: 1.5 },
      ]},
      { name: 'M4', modelSlug: 'm4', bodyType: 'Coupe', generation: 'G82', trims: [
        { name: 'M4', trimSlug: 'base', engine: '3.0L I6 Twin-Turbo', horsepower: 480, priceMultiplier: 1 },
        { name: 'M4 Competition', trimSlug: 'competition', engine: '3.0L I6 Twin-Turbo', horsepower: 510, priceMultiplier: 1.15 },
        { name: 'M4 CSL', trimSlug: 'csl', engine: '3.0L I6 Twin-Turbo', horsepower: 550, priceMultiplier: 1.6 },
      ]},
      { name: 'X5 M', modelSlug: 'x5m', bodyType: 'SUV', trims: [
        { name: 'X5 M', trimSlug: 'base', engine: '4.4L V8 Twin-Turbo', horsepower: 600, priceMultiplier: 1 },
        { name: 'X5 M Competition', trimSlug: 'competition', engine: '4.4L V8 Twin-Turbo', horsepower: 625, priceMultiplier: 1.15 },
      ]},
      { name: 'XM', modelSlug: 'xm', bodyType: 'SUV', trims: [
        { name: 'XM', trimSlug: 'base', engine: '4.4L V8 + Electric', horsepower: 653, priceMultiplier: 1 },
        { name: 'XM Label', trimSlug: 'label', engine: '4.4L V8 + Electric', horsepower: 748, priceMultiplier: 1.3 },
      ]},
      { name: '7 Series', modelSlug: '7-series', bodyType: 'Sedan', generation: 'G70', trims: [
        { name: '740i', trimSlug: '740i', engine: '3.0L I6 Turbo', horsepower: 380, priceMultiplier: 1 },
        { name: '760i xDrive', trimSlug: '760i', engine: '4.4L V8 Twin-Turbo', horsepower: 544, priceMultiplier: 1.4 },
      ]},
    ]
  },
  {
    name: 'Mercedes-Benz', makeSlug: 'mercedes-benz',
    models: [
      { name: 'AMG GT', modelSlug: 'amg-gt', bodyType: 'Sports Car', trims: [
        { name: 'AMG GT', trimSlug: 'base', engine: '4.0L V8 Twin-Turbo', horsepower: 585, priceMultiplier: 1 },
        { name: 'AMG GT 63', trimSlug: '63', engine: '4.0L V8 Twin-Turbo', horsepower: 630, priceMultiplier: 1.2 },
        { name: 'AMG GT 63 Pro', trimSlug: '63-pro', engine: '4.0L V8 Twin-Turbo', horsepower: 612, priceMultiplier: 1.5 },
      ]},
      { name: 'AMG G63', modelSlug: 'amg-g63', bodyType: 'SUV', trims: [
        { name: 'G 63', trimSlug: 'base', engine: '4.0L V8 Twin-Turbo', horsepower: 585, priceMultiplier: 1 },
        { name: 'G 63 AMG', trimSlug: 'amg', engine: '4.0L V8 Twin-Turbo', horsepower: 585, priceMultiplier: 1.1 },
      ]},
      { name: 'S-Class', modelSlug: 's-class', bodyType: 'Sedan', generation: 'W223', trims: [
        { name: 'S 500', trimSlug: 's500', engine: '3.0L I6 Turbo + Mild Hybrid', horsepower: 449, priceMultiplier: 1 },
        { name: 'S 580', trimSlug: 's580', engine: '4.0L V8 Twin-Turbo', horsepower: 503, priceMultiplier: 1.3 },
        { name: 'AMG S 63 E Performance', trimSlug: 'amg-s63', engine: '4.0L V8 + Electric', horsepower: 791, priceMultiplier: 2 },
      ]},
      { name: 'GLS', modelSlug: 'gls', bodyType: 'SUV', trims: [
        { name: 'GLS 450', trimSlug: '450', engine: '3.0L I6 Turbo', horsepower: 367, priceMultiplier: 1 },
        { name: 'GLS 580', trimSlug: '580', engine: '4.0L V8 Twin-Turbo', horsepower: 510, priceMultiplier: 1.3 },
        { name: 'AMG GLS 63', trimSlug: 'amg-63', engine: '4.0L V8 Twin-Turbo', horsepower: 612, priceMultiplier: 1.6 },
      ]},
    ]
  },
  {
    name: 'Ferrari', makeSlug: 'ferrari',
    models: [
      { name: '296 GTB', modelSlug: '296-gtb', bodyType: 'Sports Car', trims: [
        { name: '296 GTB', trimSlug: 'base', engine: '3.0L V6 Hybrid', horsepower: 830, priceMultiplier: 1 },
        { name: '296 GTS', trimSlug: 'gts', engine: '3.0L V6 Hybrid', horsepower: 830, priceMultiplier: 1.1 },
        { name: '296 GTB Assetto Fiorano', trimSlug: 'assetto-fiorano', engine: '3.0L V6 Hybrid', horsepower: 830, priceMultiplier: 1.4 },
      ]},
      { name: 'SF90 Stradale', modelSlug: 'sf90-stradale', bodyType: 'Sports Car', trims: [
        { name: 'SF90 Stradale', trimSlug: 'base', engine: '4.0L V8 Hybrid', horsepower: 986, priceMultiplier: 1 },
        { name: 'SF90 XX Stradale', trimSlug: 'xx', engine: '4.0L V8 Hybrid', horsepower: 1030, priceMultiplier: 1.5 },
      ]},
      { name: 'Roma', modelSlug: 'roma', bodyType: 'Sports Car', trims: [
        { name: 'Roma', trimSlug: 'base', engine: '3.9L V8 Twin-Turbo', horsepower: 620, priceMultiplier: 1 },
        { name: 'Roma Spider', trimSlug: 'spider', engine: '3.9L V8 Twin-Turbo', horsepower: 620, priceMultiplier: 1.08 },
      ]},
    ]
  },
  {
    name: 'Lamborghini', makeSlug: 'lamborghini',
    models: [
      { name: 'Urus', modelSlug: 'urus', bodyType: 'SUV', trims: [
        { name: 'Urus', trimSlug: 'base', engine: '4.0L V8 Twin-Turbo', horsepower: 650, priceMultiplier: 1 },
        { name: 'Urus Performante', trimSlug: 'performante', engine: '4.0L V8 Twin-Turbo', horsepower: 666, priceMultiplier: 1.2 },
        { name: 'Urus SE', trimSlug: 'se', engine: '4.0L V8 Twin-Turbo Hybrid', horsepower: 800, priceMultiplier: 1.35 },
      ]},
      { name: 'Revuelto', modelSlug: 'revuelto', bodyType: 'Sports Car', trims: [
        { name: 'Revuelto', trimSlug: 'base', engine: '6.5L V12 Hybrid', horsepower: 1015, priceMultiplier: 1 },
      ]},
    ]
  },
  {
    name: 'Range Rover', makeSlug: 'range-rover',
    models: [
      { name: 'Range Rover', modelSlug: 'range-rover', bodyType: 'SUV', generation: 'L460', trims: [
        { name: 'Range Rover P530', trimSlug: 'p530', engine: '4.4L V8 Twin-Turbo', horsepower: 530, priceMultiplier: 1 },
        { name: 'Range Rover Autobiography', trimSlug: 'autobiography', engine: '4.4L V8 Twin-Turbo', horsepower: 530, priceMultiplier: 1.25 },
        { name: 'Range Rover SV', trimSlug: 'sv', engine: '4.4L V8 Twin-Turbo', horsepower: 530, priceMultiplier: 1.5 },
      ]},
      { name: 'Range Rover Sport', modelSlug: 'range-rover-sport', bodyType: 'SUV', trims: [
        { name: 'Sport P400', trimSlug: 'p400', engine: '3.0L I6 Turbo Mild Hybrid', horsepower: 400, priceMultiplier: 1 },
        { name: 'Sport SVR', trimSlug: 'svr', engine: '4.4L V8 Twin-Turbo', horsepower: 635, priceMultiplier: 1.5 },
      ]},
    ]
  },
  {
    name: 'Rolls-Royce', makeSlug: 'rolls-royce',
    models: [
      { name: 'Ghost', modelSlug: 'ghost', bodyType: 'Sedan', trims: [
        { name: 'Ghost', trimSlug: 'base', engine: '6.75L V12 Twin-Turbo', horsepower: 571, priceMultiplier: 1 },
        { name: 'Ghost Extended', trimSlug: 'extended', engine: '6.75L V12 Twin-Turbo', horsepower: 571, priceMultiplier: 1.15 },
      ]},
      { name: 'Cullinan', modelSlug: 'cullinan', bodyType: 'SUV', trims: [
        { name: 'Cullinan', trimSlug: 'base', engine: '6.75L V12 Twin-Turbo', horsepower: 571, priceMultiplier: 1 },
        { name: 'Cullinan Series II', trimSlug: 'series-ii', engine: '6.75L V12 Twin-Turbo', horsepower: 571, priceMultiplier: 1.1 },
      ]},
    ]
  },
  {
    name: 'Bentley', makeSlug: 'bentley',
    models: [
      { name: 'Continental GT', modelSlug: 'continental-gt', bodyType: 'Coupe', trims: [
        { name: 'Continental GT Speed', trimSlug: 'speed', engine: '6.0L W12 Twin-Turbo', horsepower: 659, priceMultiplier: 1 },
        { name: 'Continental GT Mulliner', trimSlug: 'mulliner', engine: '6.0L W12 Twin-Turbo', horsepower: 659, priceMultiplier: 1.2 },
      ]},
      { name: 'Bentayga', modelSlug: 'bentayga', bodyType: 'SUV', trims: [
        { name: 'Bentayga V8', trimSlug: 'v8', engine: '4.0L V8 Twin-Turbo', horsepower: 542, priceMultiplier: 1 },
        { name: 'Bentayga Speed', trimSlug: 'speed', engine: '6.0L W12 Twin-Turbo', horsepower: 635, priceMultiplier: 1.3 },
      ]},
    ]
  },
  {
    name: 'McLaren', makeSlug: 'mclaren',
    models: [
      { name: '750S', modelSlug: '750s', bodyType: 'Sports Car', trims: [
        { name: '750S Coupe', trimSlug: 'coupe', engine: '4.0L V8 Twin-Turbo', horsepower: 750, priceMultiplier: 1 },
        { name: '750S Spider', trimSlug: 'spider', engine: '4.0L V8 Twin-Turbo', horsepower: 750, priceMultiplier: 1.08 },
        { name: '750S LT', trimSlug: 'lt', engine: '4.0L V8 Twin-Turbo', horsepower: 750, priceMultiplier: 1.3 },
      ]},
    ]
  },
  {
    name: 'Aston Martin', makeSlug: 'aston-martin',
    models: [
      { name: 'DB12', modelSlug: 'db12', bodyType: 'Coupe', trims: [
        { name: 'DB12', trimSlug: 'base', engine: '4.0L V8 Twin-Turbo', horsepower: 680, priceMultiplier: 1 },
        { name: 'DB12 Volante', trimSlug: 'volante', engine: '4.0L V8 Twin-Turbo', horsepower: 680, priceMultiplier: 1.08 },
      ]},
    ]
  },
  {
    name: 'Audi', makeSlug: 'audi',
    models: [
      { name: 'RS6 Avant', modelSlug: 'rs6-avant', bodyType: 'Wagon', trims: [
        { name: 'RS6 Avant', trimSlug: 'base', engine: '4.0L V8 Twin-Turbo', horsepower: 600, priceMultiplier: 1 },
        { name: 'RS6 Avant Performance', trimSlug: 'performance', engine: '4.0L V8 Twin-Turbo', horsepower: 630, priceMultiplier: 1.15 },
      ]},
      { name: 'A8', modelSlug: 'a8', bodyType: 'Sedan', trims: [
        { name: 'A8 L', trimSlug: 'a8l', engine: '3.0L V6 Turbo', horsepower: 340, priceMultiplier: 1 },
        { name: 'S8', trimSlug: 's8', engine: '4.0L V8 Twin-Turbo', horsepower: 571, priceMultiplier: 1.5 },
      ]},
    ]
  },
  {
    name: 'Toyota', makeSlug: 'toyota',
    models: [
      { name: 'Land Cruiser 300', modelSlug: 'land-cruiser-300', bodyType: 'SUV', trims: [
        { name: 'Land Cruiser 300 VX', trimSlug: 'vx', engine: '3.5L V6 Twin-Turbo Diesel', horsepower: 305, priceMultiplier: 1 },
        { name: 'Land Cruiser 300 GR Sport', trimSlug: 'gr-sport', engine: '3.5L V6 Twin-Turbo Diesel', horsepower: 305, priceMultiplier: 1.15 },
      ]},
    ]
  },
  {
    name: 'Lexus', makeSlug: 'lexus',
    models: [
      { name: 'LX 600', modelSlug: 'lx-600', bodyType: 'SUV', trims: [
        { name: 'LX 600', trimSlug: 'base', engine: '3.5L V6 Twin-Turbo', horsepower: 409, priceMultiplier: 1 },
        { name: 'LX 600 VIP', trimSlug: 'vip', engine: '3.5L V6 Twin-Turbo', horsepower: 409, priceMultiplier: 1.2 },
      ]},
      { name: 'LS 500', modelSlug: 'ls-500', bodyType: 'Sedan', trims: [
        { name: 'LS 500', trimSlug: 'base', engine: '3.5L V6 Twin-Turbo', horsepower: 416, priceMultiplier: 1 },
        { name: 'LS 500h', trimSlug: 'h', engine: '3.5L V6 Hybrid', horsepower: 354, priceMultiplier: 1.05 },
      ]},
    ]
  },
  {
    name: 'Bugatti', makeSlug: 'bugatti',
    models: [
      { name: 'Chiron', modelSlug: 'chiron', bodyType: 'Sports Car', trims: [
        { name: 'Chiron Super Sport', trimSlug: 'super-sport', engine: '8.0L W16 Quad-Turbo', horsepower: 1578, priceMultiplier: 1 },
        { name: 'Chiron Super Sport 300+', trimSlug: '300-plus', engine: '8.0L W16 Quad-Turbo', horsepower: 1578, priceMultiplier: 1.3 },
      ]},
    ]
  },
];

export function searchHierarchy(query: string) {
  const q = query.toLowerCase();
  const results: { make: string; model: string; trim: string; href: string }[] = [];
  for (const make of VEHICLE_HIERARCHY) {
    for (const model of make.models) {
      for (const trim of model.trims) {
        const searchText = `${make.name} ${model.name} ${trim.name}`.toLowerCase();
        if (searchText.includes(q)) {
          results.push({
            make: make.name,
            model: model.name,
            trim: trim.name,
            href: `/automotive?make=${make.makeSlug}&model=${model.modelSlug}&trim=${trim.trimSlug}`,
          });
        }
      }
    }
  }
  return results;
}

export function getModelsByBodyType(bodyType: string) {
  const results: { make: string; model: string; trims: TrimOption[] }[] = [];
  for (const make of VEHICLE_HIERARCHY) {
    for (const model of make.models) {
      if (model.bodyType.toLowerCase() === bodyType.toLowerCase()) {
        results.push({ make: make.name, model: model.name, trims: model.trims });
      }
    }
  }
  return results;
}
