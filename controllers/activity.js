import db from "../models/connection.js"

export const creatActivity = async (req, res) => {
  const { title, email } = req.body
  try {
    if (!title) {
      return res.status(400).send({
        "status": "Bad Request",
        "message": "title cannot be null"
      })
    }

    const insertQuery = `INSERT INTO activities (title, email) VALUES (?,?)`
    const [insertResult] = await db.promise().query(insertQuery, [title, email])
    const selectQuery = `SELECT * FROM activities WHERE activity_id = ?`
    const [selectResult] = await db.promise().query(selectQuery, [insertResult.insertId])

    res.status(201).send({
      "status": "Success",
      "message": "Success",
      "data": {
        id : selectResult[0].activity_id,
        title : selectResult[0].title,
        email : selectResult[0].email,
        updatedAt : selectResult[0].updated_at,
        createdAt : selectResult[0].created_at
        }
    })
    
  } catch (error) {
    console.log(error)
    res.status(400).send({
      "status": "Server Error",
      "message": error.message
    })
  }
}

export const getAllActivity = async (req, res) => {
    try {
      const selectQuery = `SELECT * FROM activities`
      const [selectResult] = await db.promise().query(selectQuery)

      const data = Array.from(selectResult, item => ({
        id: item.activity_id,
        title: item.title,
        email: item.email,
        updatedAt: item.updated_at,
        createdAt: item.created_at
      }))
  
      res.status(200).send({
        "status": "Success",
        "message": "Success",
        "data": data
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        "status": "Server Error",
        "message": error.message
      })
    }
  }

  export const getActivity = async (req, res) => {
    const {id} = req.params
    
    try {
      const selectQuery = `SELECT * FROM activities WHERE activity_id = ? `
      const [selectResult] = await db.promise().query(selectQuery,[id])  

      if (!selectResult.length) {
        res.status(404).send({
            "status": "Not Found",
            "message": `Activity with ID ${id} Not Found`
          })        
      } else {
      res.status(200).send({
        "status": "Success",
        "message": "Success",
        "data": {
            id : selectResult[0].activity_id,
            title : selectResult[0].title,
            email : selectResult[0].email,
            createdAt : selectResult[0].created_at,
            updatedAt : selectResult[0].updated_at,
        }
      })
    }
    } catch (error) {
      console.log(error)
      res.status(400).send({
        "status": "Server Error",
        "message": error.message
      })
    }
  }

  export const deleteActivity = async (req, res) => {
    const {id} = req.params
    try {
      const query = `DELETE FROM ACTIVITIES WHERE activity_id = ? `
      const [result] = await db.promise().query(query,[id])  

      if (result.affectedRows < 1) {
        res.status(404).send({
            "status": "Not Found",
            "message": `Activity with ID ${id} Not Found`
          })        
      } else {

      res.status(200).send({
        "status": "Success",
        "message": "Success",
        "data": {}
      })
    }
    } catch (error) {
      console.log(error)
      res.status(400).send({
        "status": "Server Error",
        "message": error.message
      })
    }
  }

  export const updateActivity = async (req, res) => {
    const {id} = req.params
    const {title} = req.body
    if (!title) {
        return res.status(400).send({
          "status": "Bad Request",
          "message": "title cannot be null"
        })
      }
    try {
      const query = `UPDATE ACTIVITIES SET TITLE = ?  WHERE activity_id = ? `
      const [result] = await db.promise().query(query,[title,id])  

      if (result.affectedRows < 1) {
        res.status(404).send({
            "status": "Not Found",
            "message": `Activity with ID ${id} Not Found`
          })        
      } else {

      const querySelect = `SELECT * FROM ACTIVITIES  WHERE activity_id = ? `
      const [selectResult] = await db.promise().query(querySelect,[id])  

      res.status(200).send({
        "status": "Success",
        "message": "Success",
        "data": {
            id : selectResult[0].activity_id,
            title : selectResult[0].title,
            email : selectResult[0].email,
            createdAt : selectResult[0].created_at,
            updatedAt : selectResult[0].updated_at,
        }
      })
    }
    } catch (error) {
      console.log(error)
      res.status(400).send({
        "status": "Server Error",
        "message": error.message
      })
    }
  }