'use strict';

// ==========================================
//  1. ИСХОДНЫЙ ОБЪЕКТ (из ДЗ №15)
// ==========================================
const ToDoList = {
  tasks: [],
  nextId: 1,

  addTask(title, priority = 2) {
    const newTask = {
      id: this.nextId++,
      title: String(title).trim(),
      priority: Number(priority) || 2,
    };
    this.tasks.push(newTask);
    return newTask;
  },

  removeTask(id) {
    const before = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks.length < before;
  },

  updateTask(id, updates) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) return null;
    if (updates.title !== undefined) task.title = String(updates.title).trim();
    if (updates.priority !== undefined)
      task.priority = Number(updates.priority);
    return task;
  },

  sortByPriority() {
    // Возвращаем новую копию, чтобы не мутировать исходный массив
    return [...this.tasks].sort((a, b) => a.priority - b.priority);
  },
};

// ==========================================
// 🎯 2. ОБЪЕКТ ИЗ ЗАДАНИЯ ПРЕПОДАВАТЕЛЯ
// (Исправлен синтаксис: добавлено '=' и убрана ';' внутри объекта)
// ==========================================
const newTask = {
  tasks: [
    {
      id: 1,
      name: 'тест',
      description: 'описание',
      order: 0,
    },
  ],
  nextId: 2, // Важно: продолжаем нумерацию, так как id:1 уже занят
};

// ==========================================
//  3. АДАПТАЦИЯ СТРУКТУР
// Методы ToDoList ожидают поля: title, priority
// В newTask используются: name, order
// ==========================================
function adaptStructure(obj) {
  obj.tasks = obj.tasks.map((task) => ({
    id: task.id,
    title: task.name, // name → title
    priority: task.order, // order → priority
    description: task.description,
  }));
}
adaptStructure(newTask);

// ==========================================
// 🚀 4. ПОСЛЕДОВАТЕЛЬНОЕ ПРИМЕНЕНИЕ МЕТОДОВ
// ==========================================
console.group('📌 ДЗ 16: Применение методов ToDoList к newTask');

// 🔹 ЭТАП 1: .call()
// Синтаксис: func.call(context, arg1, arg2, ...)
// Аргументы передаются через запятую, функция вызывается СРАЗУ
console.log('1️⃣ .call() — добавление задачи:');
const addedTask = ToDoList.addTask.call(newTask, 'Задача через call', 1);
console.log('✅ Добавлено:', addedTask);
console.log('📦 Текущие задачи:', newTask.tasks);

//  ЭТАП 2: .apply()
// Синтаксис: func.apply(context, [arg1, arg2, ...])
// Аргументы передаются МАССИВОМ, функция вызывается СРАЗУ
console.log('\n2️⃣ .apply() — обновление задачи ID 1:');
const updatePayload = { title: 'Обновлено через apply', priority: 3 };
const updatedTask = ToDoList.updateTask.apply(newTask, [1, updatePayload]);
console.log('✏️ Обновлено:', updatedTask);

//  ЭТАП 3: .bind()
// Синтаксис: const boundFn = func.bind(context, arg1, arg2, ...)
// Функция НЕ вызывается. Возвращается НОВАЯ функция с жёстко привязанным this
console.log('\n3️⃣ .bind() — создание привязанной функции удаления:');
const removeTaskBound = ToDoList.removeTask.bind(newTask);
console.log('🔗 Функция создана. Выполняем removeTaskBound(1)...');
removeTaskBound(1); // Вызов происходит здесь, отдельно
console.log('🗑 Удаление выполнено. Осталось задач:', newTask.tasks.length);

// 🔹 БОНУС: Сортировка через .call()
console.log('\n4️⃣ Сортировка через .call():');
const sortedTasks = ToDoList.sortByPriority.call(newTask);
console.log(' Отсортированная копия:', sortedTasks);

console.groupEnd();

// ==========================================
// 🖥️ 5. ВЫВОД РЕЗУЛЬТАТА В DOM
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const outputEl = document.getElementById('output');
  if (outputEl) {
    outputEl.textContent = JSON.stringify(newTask, null, 2);
  }
});
