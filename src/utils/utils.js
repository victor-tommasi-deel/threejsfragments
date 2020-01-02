import {
  Scene,
  PerspectiveCamera,
  Color,
  WebGLRenderer,
  Vector3,
  DirectionalLight,
  Geometry,
  Face3
} from 'three';
import Fragment from '../classes/Fragment';

const createTriangle = (p1, p2, p3) => {
  const geometry = new Geometry();
  geometry.vertices.push(p1, p2, p3);
  geometry.faces.push(new Face3(0, 1, 2));
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  return geometry;
};

const createGeometry = (dt) => {
  const p1 = new Vector3(0, 1, 0);
  const p2 = new Vector3(1, 0, 1);
  const p3 = new Vector3(-1, 0, 1);
  const p4 = new Vector3(-1, 0, -1);
  const p5 = new Vector3(1, 0, -1);
  const p6 = new Vector3(0, -1, 0);
  const fragments = [];

  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(0, 0, 6),
      createTriangle(p1, p2, p3),
      dt
    )
  );

  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(-2, 4, 0),
      createTriangle(p1, p3, p4),
      dt
    )
  );
  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(0, 5, -4),
      createTriangle(p1, p4, p5),
      dt
    )
  );
  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(2, 3, 0),
      createTriangle(p1, p5, p2),
      dt
    )
  );
  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(0, -5, 3),
      createTriangle(p3, p2, p6),
      dt
    )
  );
  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(-4, -3, 0),
      createTriangle(p6, p3, p4),
      dt
    )
  );
  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(0, -4, -4),
      createTriangle(p6, p4, p5),
      dt
    )
  );
  fragments.push(
    new Fragment(
      new Vector3(0, 0, 0),
      new Vector3(3, -3, 0),
      createTriangle(p6, p2, p5),
      dt
    )
  );
  return fragments;
};

const init = (faces, position) => {
  const { innerWidth, innerHeight } = window;
  const scene = new Scene();
  scene.background = new Color(0x000000);
  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 1, 1000);
  camera.position.z = position.z;

  const light = new DirectionalLight(0xffffff);
  scene.add(light);

  Object.entries(faces).forEach((entry) => {
    const value = entry[1];
    scene.add(value);
  });

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  return { renderer, scene, camera };
};

export { init, createGeometry };
