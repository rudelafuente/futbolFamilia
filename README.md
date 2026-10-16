# Max y Pau · Fútbol

Web estática, pensada primero para el móvil, para seguir a Max (Sp. Benimaclet C.F. 'B', Prebenjamín) y a Pau
(Godella C.F. 'E', Infantil) sin entrar en la web de la FFCV. Se publica con GitHub Pages y se puede
añadir a la pantalla de inicio del móvil como si fuera una app.

- `index.html`: la web. Solo lee `data/*.json`; no hace peticiones a la federación.
  - **Calendario**: partidos de los dos en el mismo mes y en una agenda; se pueden añadir al calendario del móvil (.ics).
  - **Max / Pau**: próximo partido, último resultado, estadísticas, partidos, clasificación y goleadores del grupo.
- `data/`: los JSON que lee la web (`max.json`, `pau.json`, `estado.json`).
- `manifest.webmanifest`, `sw.js`, `icon.svg`, `icon-180.png`, `icon-512.png`: instalación en el móvil
  (botón «Instalar app» en la cabecera; en iPhone explica los pasos de Safari).
- `actualizador/` (**no se sube al repo**, está en `.gitignore`): aplicación de consola .NET 8 con las credenciales.

## Refrescar los datos

Desde la raíz del repositorio:

```bash
dotnet run --project actualizador -- --publicar   # descarga; si hay novedades, commit + push de data/
dotnet run --project actualizador                 # solo regenera los JSON si hay novedades
dotnet run --project actualizador -- --forzar     # regenera los JSON aunque no haya cambios
```
