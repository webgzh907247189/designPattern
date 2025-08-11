module.exports.defaultOptions = {
  port: "8989",
  loading: "spin",
  text: {
    color: "#EEEEEE",
  },
  image: {
    shape: "rect",
    color: "#EFEFEF",
    shapeOpposite: [],
  },
  button: {
    color: "#EFEFEF",
    excludes: [],
  },
  svg: {
    color: "#EFEFEF",

    shape: "circle",
    shapeOpposite: [],
  },
  pseudo: {
    color: "#EFEFEF",

    shape: "circle",
    shapeOpposite: [],
  },
  device: "iPhone 6 Plus",
  minify: {
    minifyCSS: { level: 2 },
    removeComments: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: false
  },
  defer: 5000,
  excludes: [],
  remove: [],
  hide: [],
  grayBlock: [],
  cookies: [],
  headless: true,
  h5Only: false,
  // or 'vw|vh|vmin|vmax'
  cssUnit: 'rem',
  decimal: 4,
  logLevel: 'info',
  quiet: false,
  noInfo: false,
  logTime: true
};


