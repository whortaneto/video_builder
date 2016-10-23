'use strict';

module.exports[404] = (req, res) => {
  const viewFilePath = '404'
  const result = {
    status: 404
  }

  res.status(result.status)
  res.render(viewFilePath, function (err) {
    if (err) { 
      return res.json(result, result.status) 
    }
    res.render(viewFilePath)
  })
}
