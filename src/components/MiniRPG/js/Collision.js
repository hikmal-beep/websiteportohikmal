class Collision {
  static intersects(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  static canMove(rect, blockers, worldWidth, worldHeight) {
    if (rect.x < 0 || rect.y < 0 || rect.x + rect.width > worldWidth || rect.y + rect.height > worldHeight) {
      return false;
    }
    return !blockers.some((blocker) => Collision.intersects(rect, blocker));
  }
}
