import db from "../models/connection.js"

export const createTodo = async (req, res) => {
  const { title, activity_group_id,is_active,priority } = req.body
  try {
    if (!title || !activity_group_id || !is_active ) {
      return res.status(400).send({
        "status": "Bad Request",
        "message": "title cannot be null"
      })
    }

    const insertQuery = `INSERT INTO todos (title, activity_group_id,is_active,priority) VALUES (?,?,?,?)`
    const [insertResult] = await db.promise().query(insertQuery, [title, activity_group_id,is_active,priority])
    const selectQuery = `SELECT * FROM todos WHERE todo_id = ?`
    const [selectResult] = await db.promise().query(selectQuery, [insertResult.insertId])

    res.status(201).send({
      "status": "Success",
      "message": "Success",
      "data": {
        id : selectResult[0].todo_id,
        title : selectResult[0].title,
        activity_group_id : selectResult[0].activity_group_id,
        is_active : selectResult[0].is_active,
        priority : selectResult[0].priority,
        createdAt : selectResult[0].created_at,
        updatedAt :selectResult[0].updated_at
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

export const getAllTodos = async (req, res) => {

    const {activity_group_id} = req.query
    try {
    
      let where = activity_group_id ? `WHERE activity_group_id = ${activity_group_id}` : ''
      const selectQuery = `SELECT * FROM TODOS ${where}`
      const [selectResult] = await db.promise().query(selectQuery)

      const data = Array.from(selectResult, item => ({
        id : item.activity_group_id,
            title : item.title,
            is_active : item.is_active,
            priority : item.priority,
            createdAt : item.created_at,
            updatedAt : item.updated_at,
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

  export const getTodo = async (req, res) => {
    const {id} = req.params
    
    try {
      const selectQuery = `SELECT * FROM TODOS WHERE todo_id = ? `
      const [selectResult] = await db.promise().query(selectQuery,[id])  

      if (!selectResult.length) {
        res.status(404).send({
            "status": "Not Found",
            "message": `Todo with ID ${id} Not Found`
          })        
      } else {
      res.status(200).send({
        "status": "Success",
        "message": "Success",
        "data": {
            id : selectResult[0].todo_id,
            title : selectResult[0].title,
            activity_group_id : selectResult[0].activity_group_id,
            is_active : selectResult[0].is_active,
            priority : selectResult[0].priority,
            createdAt : selectResult[0].created_at,
            updatedAt :selectResult[0].updated_at
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

  export const deleteTodo = async (req, res) => {
    const {id} = req.params
    try {
      const query = `DELETE FROM TODOS WHERE TODO_ID = ? `
      const [result] = await db.promise().query(query,[id])  

      if (result.affectedRows < 1) {
        res.status(404).send({
            "status": "Not Found",
            "message": `Todos with ID ${id} Not Found`
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

  export const updateTodo = async (req, res) => {
    const {id} = req.params
    const {title,priority,is_active,status} = req.body
    if (!title) {
        return res.status(400).send({
          "status": "Bad Request",
          "message": "title cannot be null"
        })
      }
    try {
      const query = `UPDATE TODOS SET TITLE = ?, PRIORITY = ?, IS_ACTIVE = ? WHERE todo_id = ? `
      const [result] = await db.promise().query(query,[title,priority,is_active,id])  

      if (result.affectedRows < 1) {
        res.status(404).send({
            "status": "Not Found",
            "message": `Todo with ID ${id} Not Found`
          })        
      } else {

      const querySelect = `SELECT * FROM TODOS  WHERE TODO_ID = ? `
      const [selectResult] = await db.promise().query(querySelect,[id])  

      res.status(200).send({
        "status": "Success",
        "message": "Success",
        "data": {
            id : selectResult[0].todo_id,
            title : selectResult[0].title,
            activity_group_id : selectResult[0].activity_group_id,
            is_active : selectResult[0].is_active,
            priority : selectResult[0].priority,
            createdAt : selectResult[0].created_at,
            updatedAt :selectResult[0].updated_at
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