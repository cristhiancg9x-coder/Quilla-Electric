const eb3Bat = new Proxy({"src":"/_astro/eb3-bat.Do7at164.png","width":482,"height":358,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/eb3-bat.png";
							}
							
							return target[name];
						}
					});

export { eb3Bat as default };
