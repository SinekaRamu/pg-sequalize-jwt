async function addRatingController(req, res) {
  try {
    const queryText =
      "INSERT INTO ratings(item_id,user_id,rating) VALUES($1,$2,$3) RETURNING *";
    const pgRes = await pgClient.query(queryText, [
      req.body.item_id,
      req.body.user_id,
      req.xop.rating,
    ]);
    res.json({
      rows: pgRes.rows,
      count: pgRes.rowCount,
    });
  } catch (err) {
    res.status(500).json({ error: "Unknown Error" });
  }
}

const overallRatingController = async (req, res) => {
  const pgRes = await pgClient.query(
    "select item_id,AVG(rating) AS overall_rating from ratings GROUP by item_id;"
  );

  res.json({
    rows: pgRes.rows,
    count: pgRes.rowCount,
  });
};

module.exports = {
  addRatingController,
  overallRatingController,
};
