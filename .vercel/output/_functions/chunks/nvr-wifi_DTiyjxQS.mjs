const nvrWifi = new Proxy({"src":"/_astro/nvr-wifi.CXubLPTG.png","width":757,"height":521,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/PROYECTOS/quilla-astro/src/assets/camaras/nvr-wifi.png";
							}
							
							return target[name];
						}
					});

export { nvrWifi as default };
