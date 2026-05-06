# Frontend-Sistemas-De-Reserva-Del-Hotel-1
Desarrollo del Frontend de Sistema de Reservas de Hotel en python
 
---
 
## Ejecución del Frontend
   
Sigue estos pasos para ejecutar correctamente el proyecto en tu entorno local:
 
### Clonar el repositorio
 
```bash
git clone https://github.com/YisetValencia/Frontend-Sistemas-De-Reserva-Del-Hotel-1
cd Frontend-Sistemas-De-Reserva-Del-Hotel-1
```
 
## Comandos rápidos
 
```bash
npm install
npm start          # http://localhost:4200
npm run build      # salida en dist/
 
Desde la carpeta padre también puedes usar `npm start` (delega a este proyecto).
```
 
## Configuración del entorno
```bash
web/src/environments/environment.ts
```
## Ejemplo
```bash
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'
};
```
 
## Estructura de carpetas del repositorio
 
```
Frontend-Sistemas-De-Reserva-Del-Hotel-     ← Raíz del repo (scripts npm cómodos)
├── package.json                            ← Delega start/build/test a web/
├── README.md                               ← Documentación del proyecto
└── web/                                    ← Proyecto Angular real
    ├── angular.json
    ├── package.json                        ← Dependencias y scripts ng
    ├── tsconfig.json
    ├── src/
    │   ├── index.html
    │   ├── main.ts
    │   ├── styles.scss                     ← Tema Material + estilos globales
    │   ├── environments/
    │   │   ├── environment.ts              ← Desarrollo (apiUrl)
    │   │   └── environment.prod.ts         ← Producción (reemplazo en build prod)
    │   └── app/
    │       ├── app.ts                      ← Raíz: solo <router-outlet />
    │       ├── app.html
    │       ├── app.scss
    │       ├── app.config.ts               ← HttpClient, animaciones, router + view transitions
    │       ├── app.routes.ts               ← Rutas y lazy loading
    │       ├── models/
    │       │   └── api.models.ts           ← Interfaces TypeScript alineadas al API
    │       ├── core/
    │       │   ├── audit-context.service.ts
    │       │   ├── audit-user.guard.ts
    │       │   └── services/               ← Un servicio por entidad (HTTP)
    │       ├── shared/
    │       │   └── ids.ts                  ← Utilidad para mostrar UUIDs cortos
    │       └── features/
    │           ├── login/                  ← Pantalla de acceso
    │           ├── shell/                  ← Layout: sidenav + toolbar + outlet
    │           ├── usuario/                ← Lista + diálogo CRUD
    │           ├── habitacion/
    │           ├── login/
    │           ├── reserva/
    │           ├── reserva_servicios/
    │           ├── servicios_adicionales/
    │           ├── shell/    
    │           ├── tipo_habitacion/  
    │           └── usuarios/
    └── public/
        └── favicon.ico
```
 
**Link del parcial**  
 
```bash
link: https://drive.google.com/file/d/1mjReVEywBSJz0UlFmdzXZEJWZ2qkQI42/view?usp=sharing
```
 
**Link del Backend**
```bash
link del backend: https://github.com/YisetValencia/Backend-Sistemas-De-Reserva-Del-Hotel-En-Python1
```
 
**Integrantes:**  
 
```bash
Yiset Mariana Valencia Isaza.
Kevin Stiven Montoya Suarez.
Santiago Quintero Lopéz.
David Arboleda Londoño.
