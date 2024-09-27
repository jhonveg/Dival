import Task from '../models/task.model.js'


export const getTasks = async (req, res) => {

    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks)

}
export const createTask = async (req, res) => {

    const { title, description, date, } = req.body

    try {

        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })


        const savedTask = await newTask.save();

        res.json(savedTask)


    } catch (error) {

        res.status(404).json(error)
        console.log(error)
        console.log(req.user)

    }

}
export const getTask = async (req, res) => {

    const findTask = await Task.findById(req.params.id).populate("user")
    if (!findTask) return res.status(404).json({ message: "No se encontró ninguna tarea" })
    res.json(findTask)



}
export const deleteTask = async (req, res) => {
    const findTask = await Task.findByIdAndDelete(req.params.id)
    if (!findTask) return res.status(404).json({ message: "No se encontró ninguna tarea" })
    res.status(200).json({ message: "Tarea eliminada" })


}
export const updateTask = async (req, res) => {

    const findTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!findTask) return res.status(404).json({ message: "No se encontró ninguna tarea" })
    res.json(findTask)



}