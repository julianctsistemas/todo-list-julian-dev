# Aplicación Web - Lista de Tareas (To-Do List)

Esta aplicación web permite registrar, ver, completar y eliminar tareas. Ha sido desarrollada como parte de una prueba técnica usando tecnologías modernas como **Next.js**, **TypeScript**, **Tailwind CSS** y **Prisma ORM** con base de datos SQLite.

---

## Funcionalidades

- Registrar tareas
- Mostrar tareas en tabla (pendientes arriba, completadas abajo)
- Marcar tareas como completadas o pendientes
- Eliminar tareas (solo si están completadas)
- Validaciones visuales (campo vacío, longitud mínima)
- Alertas de error y diseño responsivo
- Persistencia con base de datos real (SQLite)

---

## Tecnologías Usadas

- [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [SQLite](https://www.sqlite.org/)

---

## Estructura del Proyecto

```
src/
├── components/           → Componente visual de cada tarea
│   └── TaskItem.tsx
├── lib/                  → Cliente de Prisma
│   └── db.ts
├── pages/
│   ├── api/
│   │   └── tasks/        → Rutas API para manejar tareas
│   │       ├── index.ts  # GET y POST
│   │       └── [id].ts   # PATCH y DELETE
│   └── index.tsx         → Página principal (UI)
├── styles/
│   └── globals.css       → Tailwind
├── types/
│   └── task.ts           → Tipado de la tarea
```


##  ¿Cómo ejecutar el proyecto?

1. **Clonar el repositorio**

```bash
git clone https://github.com/julianctsistemas/todo-list-julian-dev.git
cd todo-list-julian-dev
```

2. **Instalar dependencias**

```bash
npm install
```

---

###  Configurar variables de entorno

Antes de ejecutar Prisma, necesitas crear un archivo `.env` en la raíz del proyecto con la siguiente variable:

```dotenv
DATABASE_URL="file:./dev.db"
```

Puedes crearlo manualmente o ejecutar este comando en tu terminal:

```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
```

---

3. **Configurar la base de datos con Prisma**

```bash
npx prisma db push
```

Esto crea la base de datos SQLite (`dev.db`) y sincroniza el esquema definido en `prisma/schema.prisma`.

Si ves un error como:

```
Error: Environment variable not found: DATABASE_URL
```

Asegúrate de haber creado correctamente el archivo `.env` como se indicó en el paso anterior.

---

4. **Ejecutar el servidor de desarrollo**

```bash
npm run dev
```

Luego abre tu navegador en:  
[http://localhost:3000](http://localhost:3000)

---

###  Herramientas útiles para desarrollo

Ejecuta Prisma Studio para visualizar y editar la base de datos desde una interfaz web:

```bash
npx prisma studio
```

Esto abrirá un panel en:  
[http://localhost:5555](http://localhost:5555)

---

##  Autor

Desarrollado por **Julián Andres Carreño Tejada**  
Prueba Técnica - Desarrollador Junior Full Stack
