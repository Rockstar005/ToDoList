package com.example.todolist.service;

import com.example.todolist.model.Todo;
import com.example.todolist.repository.TodoRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // CREATE
    public Todo addTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // READ
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // UPDATE
    public Todo updateTodo(Long id, Todo updatedTodo) {

        Todo todo = todoRepository.findById(id).orElse(null);

        if (todo == null) {
            return null;
        }

        todo.setTask(updatedTodo.getTask());
        todo.setCompleted(updatedTodo.isCompleted());

        return todoRepository.save(todo);
    }

    // DELETE
    public boolean deleteTodo(Long id) {

        if (!todoRepository.existsById(id)) {
            return false;
        }

        todoRepository.deleteById(id);

        return true;
    }
}