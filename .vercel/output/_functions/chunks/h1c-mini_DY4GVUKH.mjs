const h1cMini = new Proxy({"src":"/_astro/h1c-mini.CWtO6tJb.png","width":207,"height":324,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/h1c-mini.png";
							}
							
							return target[name];
						}
					});

export { h1cMini as default };
