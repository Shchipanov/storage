const getTranslate = (translate) => {
  const values = translate.split(/\w+\(|\);?/);
  const results = values[1].split(/,\s?/g).map(parseFloat);

  return {
    x: results[0],
    y: results[1],
    z: results[2],
  };
};

export {getTranslate};
