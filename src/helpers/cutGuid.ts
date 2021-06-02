export const cutGuid = (guid: string) => {
  return (
    guid.substring(0, 4) + "..." + guid.substring(guid.length - 4, guid.length)
  );
};
