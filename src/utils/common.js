

export function filterData (searchText, data) {
    const restCard = data.filter((e) => {
      return e.info.name.toLowerCase().includes(searchText);
    });
    return restCard;
  };