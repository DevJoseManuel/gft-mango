# Prueba

Algunas consideraciones y suposiciones que he seguido para la realización de los ejercios:

- Se ha utilizado NextJS como framework de desarrollo y la herramienta CLI `create-next-app` para la generación de la estructura de directorios y la configuración inicial del proyecto.

- Para la realización de los test he elegido Vitest junto con React Testing Library.

- Al no poder hacer uso del elemento input range de HTML he utilizado la librería [react-dragable](https://github.com/react-grid-layout/react-draggable) puesto que es una de las más populares para realiazar drag and drop de elementos en React.

## Instalación y configuración.

Se ha de clonar este directorio y realizar la instalación de todas las dependecias.

Para ejecutar el código:

```bash
yarn dev
```

Una vez arranque el servidor se puede acceder a la aplicación en [http://localhost:3000](http://localhost:3000).

Para ejecutar los test:

```bash
yarn test
```

## Consideraciones de diseño.

- Cuando no se cumple alguna de las reglas de validación a la hora de arrastrar los _bullets_ se dejarán en la última posición _correcta_ (válida) que se haya conocido.

- Ambos sliders reciben como prop adicional `onChange` que será una callback function que se invocará siempre y cuando finalice un cambio correcto en el rango de valores ya sea o bien porque se deslizan los bullets o bien porque se introduce un nuevo valor (aunque esto último no es posible en el `RangeInput`). De esta manera el componente padre que los vaya a utilizar tendrá una manera de poder utilizar los valores que están recogidos en el rango.

### Consideraciones propias de `NormalRange`

- Los valores que se pasen en las props `min` y `max` deberían estar escalados y este es un punto de mejora para el componente ya que en la implementación que se proporciona el ancho en píxeles del slider es igual a `max - min` pudiendo llegar a crear sliders gigantescos.

### Consideraciones propias de `FixedRange`

- El criterio de diseño que he seguido es que en el slider se divide en tantos segmentos como puntos se pueden elegir menos uno, siendo el menor valor el inferior del conjunto de puntos y el mayor valor el elemento mayor del conjunto de puntos.

- No se permite la existencia de puntos duplicados y además el conjunto de puntos deberá estar formado por al menos dos puntos .

- No se permitirá que el valor mínimo seleccionado sea igual que el valor máximo (el rango de valores seleccionado estará formado por al menos dos puntos).

> **Nota:** en el repo está comentada la línea que excluye al fichero .env.local de estar dentro del repositorio para que se puedan ver y acceder a los endpoints que se han utilizado durante el desarrollo de la prueba.
