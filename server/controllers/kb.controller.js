const db = require('../db');
const { MindsDB, connectToMindsDB } = require('../mindsdbClient');

exports.createKnowledgeBase = async (req, res) => {
  try {
    await db.query(`
      CREATE KNOWLEDGE_BASE tech_qna;
    `);

    await db.query(`CREATE INDEX ON tech_qna`);

    res.json({ message: 'Knowledge Base created & indexed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'KB creation failed' });
  }
};

exports.insertData = async (req, res) => {
  const { content, tag, difficulty } = req.body;

  try {
    await db.query(`
      INSERT INTO tech_qna (content, metadata)
      VALUES (?, JSON_OBJECT('tag', ?, 'difficulty', ?))
    `, [content, tag, difficulty]);

    res.json({ message: 'Data inserted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Insertion failed' });
  }
};
exports.searchKB = async (req, res) => {
    const { q = '', tag } = req.query;
  
    try {
      await connectToMindsDB();
  
      const query = `
        SELECT * FROM tech_qna 
        WHERE content LIKE '${q}'
        ${tag ? `AND JSON_EXTRACT(metadata, '$.tag') = '${tag}'` : ''}
      `;
  
      const results = await MindsDB.SQL.runQuery(query);
  
      res.json(results.rows);
    } catch (err) {
      console.error('Search failed:', err);
      res.status(500).json({ error: 'Search failed' });
    }
  };
  