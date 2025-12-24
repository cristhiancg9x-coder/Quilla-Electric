const imouBullet3 = new Proxy({"src":"/_astro/imou-bullet3.SSdLpRBq.png","width":439,"height":406,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/imou-bullet3.png";
							}
							
							return target[name];
						}
					});

export { imouBullet3 as default };
