import React from 'react';
import { init, createGeometry } from './utils/utils';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.05,
      dt: 0.02,
      renderer: null,
      scene: null,
      camera: null,
      fragments: null
    };
  }

  componentDidMount = () => {
    document.body.addEventListener('click', this.createFragments);
  };

  createFragments = () => {
    document.body.removeEventListener('click', this.createFragments);
    const { dt } = this.state;
    const fragments = createGeometry(dt);
    const shapes = fragments.map(({ shape }) => shape);
    const start = init(shapes, { z: 20 });
    const viewer = document.getElementById('viewer');
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera,
      fragments
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, scene, camera, renderer, fragments, dt } = this.state;
    if (
      scene !== null &&
      camera !== null &&
      renderer !== null &&
      fragments !== null
    ) {
      fragments.forEach((fragment) => {
        fragment.move(dt);
      });
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
