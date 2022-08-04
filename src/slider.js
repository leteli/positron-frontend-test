const slider = (items, itemsByPage, pageNumber) => items.filter(
    (item, index) =>
      itemsByPage * (pageNumber - 1) <= index < itemsByPage * pageNumber
  );

export default slider;
