class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    // Remove some fields for category
    const removeFields = ["keyword", "page", "limit"];
  
    removeFields.forEach((key) => delete queryCopy[key]);
  
    // Price and rating filter
    let queryObj = { ...queryCopy };
    const queryString = JSON.stringify(queryObj);
    queryObj = JSON.parse(queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`));
  
    this.query = this.query.find(queryObj);
    return this;
  }
  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
