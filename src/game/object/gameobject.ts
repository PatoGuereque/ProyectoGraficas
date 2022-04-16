import { Mesh } from 'three';
import GameWindow from '../../scene/window';
import { Component } from '../component/component';
import { ComponentType } from '../component/types';

export abstract class GameObject {
  private components: Map<ComponentType, Component> = new Map();
  protected mesh: Mesh;

  public hasComponent(componentType: ComponentType): boolean {
    return this.components.has(componentType);
  }

  public addComponent(component: Component): void {
    const componentType = component.getComponentType();
    if (this.hasComponent(componentType)) {
      throw new Error(`GameObject already has component ${componentType}`);
    }

    this.components.set(component.getComponentType(), component);
  }

  public removeComponent(componentType: ComponentType) {
    return this.components.delete(componentType);
  }

  public getComponent(componentType: ComponentType) {
    return this.components.get(componentType);
  }

  public init(window: GameWindow): void {
    this.components.forEach((component) => {
      component.init(window, this);
    });
  }

  public update(time: number, gameWindow: GameWindow): void {
    this.components.forEach((component) => {
      component.update(time, gameWindow, this);
    });
  }

  public destroy(window: GameWindow) {
    this.components.forEach((component) => {
      component.destroy(window, this);
    });
  }
}
