let events: any[] = [];

export const replayer = {
  create: () => {
    return new (window as any).rrweb.Replayer(events);
  },
  player: (player: any) => {
    player.play();
  },
  record: () => {
    (window as any).rrweb.record({
      emit(event: any) {
        // push event into the events array
        events.push(event);
      },
    });
  }
};
