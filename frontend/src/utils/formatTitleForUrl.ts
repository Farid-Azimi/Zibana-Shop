const formatTitleForUrl = (title: string) => {
    return title.trim().replace(/\s+/g, "-");
  };

  export { formatTitleForUrl }