import { ObjectId } from "mongodb";
import { client } from "../db.js";

export function getAllStudent() {
  return client.db("student-app").collection("students").find().toArray();
}

export async function getStudentById(id) {
  return client
    .db("student-app")
    .collection("students")
    .findOne({ _id: new ObjectId(id) });
}

export function postNewStudent(data) {
  return client.db("student-app").collection("students").insertOne(data);
}

export function editStudent(id, data) {
  return client
    .db("student-app")
    .collection("students")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}

export function deleteStudent(id, data) {
  return client
    .db("student-app")
    .collection("students")
    .findOneAndDelete({ _id: new ObjectId(id) });
}
