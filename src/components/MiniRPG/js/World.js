class World {
  constructor() {
    this.tileSize = 32;
    this.cols = 70;
    this.rows = 48;
    this.width = this.cols * this.tileSize;
    this.height = this.rows * this.tileSize;
    this.blockers = [];
    this.foreground = [];
    this.npcs = [];
    this.flowers = [];
    this.createVillage();
  }

  createVillage() {
    this.roads = [
      { x: 0, y: 640, width: this.width, height: 96 },
      { x: 928, y: 0, width: 96, height: this.height },
      { x: 288, y: 352, width: 1152, height: 64 },
      { x: 384, y: 352, width: 64, height: 640 },
      { x: 1504, y: 512, width: 64, height: 480 }
    ];

    this.rivers = [
      { x: 0, y: 1040, width: 832, height: 96 },
      { x: 1056, y: 1040, width: 1184, height: 96 },
      { x: 800, y: 736, width: 96, height: 304 },
      { x: 1760, y: 160, width: 96, height: 880 }
    ];

    this.bridges = [
      { x: 832, y: 1040, width: 224, height: 96 },
      { x: 800, y: 896, width: 96, height: 96 },
      { x: 1760, y: 640, width: 96, height: 112 }
    ];

    this.lakes = [
      { x: 128, y: 150, width: 256, height: 160 },
      { x: 1376, y: 1168, width: 256, height: 160 }
    ];

    this.houses = [
      { x: 250, y: 450, width: 160, height: 128, roof: "#b9423c", wall: "#f0cc92" },
      { x: 610, y: 220, width: 192, height: 144, roof: "#4e85c8", wall: "#e7c48a" },
      { x: 1120, y: 470, width: 176, height: 128, roof: "#d08335", wall: "#f4d29a" },
      { x: 1430, y: 260, width: 176, height: 128, roof: "#8f5bb8", wall: "#e9c596" },
      { x: 320, y: 850, width: 176, height: 128, roof: "#579653", wall: "#e9ca99" }
    ];

    this.rocks = [
      { x: 1320, y: 820, width: 48, height: 38 },
      { x: 1220, y: 920, width: 58, height: 42 },
      { x: 1690, y: 1180, width: 48, height: 36 },
      { x: 520, y: 1160, width: 58, height: 40 }
    ];

    this.trees = [];
    for (let i = 0; i < 24; i += 1) {
      this.trees.push({
        x: 64 + (i * 211) % (this.width - 160),
        y: 72 + (i * 137) % (this.height - 180)
      });
    }
    this.trees.push({ x: 1660, y: 70 }, { x: 1900, y: 350 }, { x: 168, y: 1220 }, { x: 1960, y: 1240 });

    this.bushes = [];
    for (let i = 0; i < 34; i += 1) {
      this.bushes.push({
        x: 80 + (i * 149) % (this.width - 120),
        y: 110 + (i * 229) % (this.height - 120),
        width: 38,
        height: 26
      });
    }

    this.createNpcs();
    this.createBlockers();
    this.createFlowers();
  }

  createNpcs() {
    this.npcs = [
      new NPC({ name: "Village Elder", x: 930, y: 570, color: "#6d78bf", hair: "#d9d9d9", facing: "down", dialogue: ["Welcome to our peaceful village.", "People here live peacefully.", "Enjoy exploring our town."] }),
      new NPC({ name: "Merchant", x: 700, y: 610, color: "#d38d39", hair: "#57321d", facing: "down", dialogue: ["My shop is closed today.", "Come back tomorrow.", "Have a wonderful day."] }),
      new NPC({ name: "Town Guard", x: 1518, y: 610, color: "#5b8aa8", hair: "#31313e", facing: "left", dialogue: ["Everything is safe today.", "Please respect the villagers.", "Good luck on your journey."] }),
      new NPC({ name: "Farmer", x: 430, y: 1040, color: "#7c9b3e", hair: "#7b4b21", facing: "right", dialogue: ["The harvest is excellent this year.", "Rain has been generous.", "Time to get back to work."] }),
      new NPC({ name: "Mage", x: 1370, y: 430, color: "#7b55bd", hair: "#eee3c6", facing: "down", dialogue: ["Magic requires patience.", "Knowledge comes with experience.", "One day you will understand."] }),
      new NPC({ name: "Little Girl", x: 1030, y: 750, color: "#d75e9d", hair: "#a65526", facing: "up", dialogue: ["I lost my butterfly.", "Have you seen it?", "Thank you for talking with me."] })
    ];
  }

  createBlockers() {
    this.blockers = [];
    this.houses.forEach((house) => this.blockers.push({ x: house.x + 12, y: house.y + 50, width: house.width - 24, height: house.height - 50 }));
    this.trees.forEach((tree) => this.blockers.push({ x: tree.x + 18, y: tree.y + 48, width: 28, height: 20 }));
    this.bushes.forEach((bush) => this.blockers.push({ x: bush.x, y: bush.y + 6, width: bush.width, height: bush.height - 6 }));
    this.rocks.forEach((rock) => this.blockers.push(rock));
    this.npcs.forEach((npc) => this.blockers.push(npc.collisionBox));

    this.rivers.forEach((river) => {
      const bridgeOverlaps = this.bridges.some((bridge) => Collision.intersects(river, bridge));
      if (!bridgeOverlaps) {
        this.blockers.push(river);
      } else {
        this.blockers.push(...this.subtractBridge(river));
      }
    });
    this.lakes.forEach((lake) => this.blockers.push(lake));
  }

  subtractBridge(river) {
    let pieces = [river];
    this.bridges.forEach((bridge) => {
      pieces = pieces.flatMap((piece) => {
        if (!Collision.intersects(piece, bridge)) return [piece];
        const result = [];
        if (bridge.x > piece.x) result.push({ x: piece.x, y: piece.y, width: bridge.x - piece.x, height: piece.height });
        if (bridge.x + bridge.width < piece.x + piece.width) {
          result.push({ x: bridge.x + bridge.width, y: piece.y, width: piece.x + piece.width - bridge.x - bridge.width, height: piece.height });
        }
        if (bridge.y > piece.y) result.push({ x: piece.x, y: piece.y, width: piece.width, height: bridge.y - piece.y });
        if (bridge.y + bridge.height < piece.y + piece.height) {
          result.push({ x: piece.x, y: bridge.y + bridge.height, width: piece.width, height: piece.y + piece.height - bridge.y - bridge.height });
        }
        return result.filter((part) => part.width > 0 && part.height > 0);
      });
    });
    return pieces;
  }

  createFlowers() {
    const colors = ["#ef6f8f", "#f2d05a", "#f6f0ff", "#7bd6de"];
    for (let i = 0; i < 150; i += 1) {
      this.flowers.push({
        x: 20 + (i * 97) % (this.width - 40),
        y: 40 + (i * 173) % (this.height - 80),
        color: colors[i % colors.length]
      });
    }
  }

  draw(ctx, camera, time) {
    this.drawGround(ctx, camera);
    this.drawRoads(ctx, camera);
    this.drawWater(ctx, camera, time);
    this.bridges.forEach((bridge) => this.drawBridge(ctx, camera, bridge));
    this.flowers.forEach((flower) => this.drawFlower(ctx, camera, flower));
    this.bushes.forEach((bush) => this.drawBush(ctx, camera, bush));
    this.rocks.forEach((rock) => this.drawRock(ctx, camera, rock));
    this.houses.forEach((house) => this.drawHouse(ctx, camera, house));
    this.trees.forEach((tree) => this.drawTree(ctx, camera, tree));
  }

  drawGround(ctx, camera) {
    const tile = this.tileSize;
    const startCol = Math.floor(camera.x / tile);
    const endCol = Math.ceil((camera.x + camera.canvas.width) / tile);
    const startRow = Math.floor(camera.y / tile);
    const endRow = Math.ceil((camera.y + camera.canvas.height) / tile);

    for (let row = startRow; row <= endRow; row += 1) {
      for (let col = startCol; col <= endCol; col += 1) {
        const x = col * tile - camera.x;
        const y = row * tile - camera.y;
        ctx.fillStyle = (row + col) % 2 === 0 ? "#74bf62" : "#6fb75d";
        ctx.fillRect(x, y, tile, tile);
        ctx.fillStyle = "rgba(255,255,255,0.09)";
        ctx.fillRect(x + 5, y + 7, 4, 3);
        ctx.fillRect(x + 21, y + 20, 5, 3);
      }
    }
  }

  drawRoads(ctx, camera) {
    this.roads.forEach((road) => {
      ctx.fillStyle = "#b7a071";
      ctx.fillRect(road.x - camera.x, road.y - camera.y, road.width, road.height);
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      for (let x = road.x; x < road.x + road.width; x += 38) {
        for (let y = road.y; y < road.y + road.height; y += 34) {
          ctx.fillRect(x - camera.x + 8, y - camera.y + 12, 10, 5);
        }
      }
    });
  }

  drawWater(ctx, camera, time) {
    [...this.rivers, ...this.lakes].forEach((water) => {
      ctx.fillStyle = "#3ca1d8";
      ctx.fillRect(water.x - camera.x, water.y - camera.y, water.width, water.height);
      ctx.fillStyle = "rgba(198, 241, 255, 0.45)";
      for (let x = water.x + 10; x < water.x + water.width; x += 54) {
        const wave = Math.sin(time * 3 + x * 0.02) * 4;
        ctx.fillRect(x - camera.x, water.y - camera.y + water.height / 2 + wave, 22, 3);
      }
    });
  }

  drawBridge(ctx, camera, bridge) {
    ctx.fillStyle = "#9d673c";
    ctx.fillRect(bridge.x - camera.x, bridge.y - camera.y, bridge.width, bridge.height);
    ctx.fillStyle = "#73482d";
    for (let x = bridge.x; x < bridge.x + bridge.width; x += 24) {
      ctx.fillRect(x - camera.x, bridge.y - camera.y, 4, bridge.height);
    }
  }

  drawHouse(ctx, camera, house) {
    const x = house.x - camera.x;
    const y = house.y - camera.y;
    ctx.fillStyle = house.roof;
    ctx.fillRect(x, y + 16, house.width, 42);
    ctx.fillStyle = "#6f3028";
    ctx.fillRect(x + 12, y, house.width - 24, 26);
    ctx.fillStyle = house.wall;
    ctx.fillRect(x + 14, y + 54, house.width - 28, house.height - 54);
    ctx.fillStyle = "#654028";
    ctx.fillRect(x + house.width / 2 - 16, y + house.height - 42, 32, 42);
    ctx.fillStyle = "#89c6ee";
    ctx.fillRect(x + 30, y + 76, 28, 24);
    ctx.fillRect(x + house.width - 58, y + 76, 28, 24);
  }

  drawTree(ctx, camera, tree) {
    const x = tree.x - camera.x;
    const y = tree.y - camera.y;
    ctx.fillStyle = "#7b4e24";
    ctx.fillRect(x + 25, y + 42, 14, 30);
    ctx.fillStyle = "#2c8c46";
    ctx.fillRect(x + 8, y + 18, 48, 34);
    ctx.fillStyle = "#3aa859";
    ctx.fillRect(x + 16, y, 34, 32);
    ctx.fillStyle = "#1f7039";
    ctx.fillRect(x + 5, y + 34, 54, 18);
  }

  drawBush(ctx, camera, bush) {
    ctx.fillStyle = "#3ea354";
    ctx.fillRect(bush.x - camera.x, bush.y - camera.y + 7, bush.width, bush.height - 7);
    ctx.fillStyle = "#58bc69";
    ctx.fillRect(bush.x - camera.x + 5, bush.y - camera.y, bush.width - 10, bush.height - 8);
  }

  drawRock(ctx, camera, rock) {
    ctx.fillStyle = "#8c969a";
    ctx.fillRect(rock.x - camera.x, rock.y - camera.y + 10, rock.width, rock.height - 10);
    ctx.fillStyle = "#b7c0c1";
    ctx.fillRect(rock.x - camera.x + 8, rock.y - camera.y, rock.width - 16, 18);
  }

  drawFlower(ctx, camera, flower) {
    ctx.fillStyle = flower.color;
    ctx.fillRect(flower.x - camera.x, flower.y - camera.y, 4, 4);
    ctx.fillStyle = "#2d7d3d";
    ctx.fillRect(flower.x - camera.x + 1, flower.y - camera.y + 4, 2, 5);
  }
}
