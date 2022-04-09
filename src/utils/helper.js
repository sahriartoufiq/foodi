module.exports = {
  filterDescriptions: (data) => {
    let newData = JSON.parse(data);

    if (newData.blocks[0].text.trim() == '') {
      return null;
    }

    return data;
  },
};
