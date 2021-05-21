import { Injectable } from '@nestjs/common';
import { RoomUserService } from '../room-user/room-user.service';
import { WsRoomFullException } from './exception/ws-room-full.exception';
import { ExtendSocket } from './type/extend-socket';
import { ConnectionRoomUserStatusEnum } from '../room-user/enum/connection-room-user-status.enum';

@Injectable()
export class WsService {
  constructor(private roomUserService: RoomUserService) {}

  async roomConnect(client: ExtendSocket): Promise<void> {
    const playerCount = await this.roomUserService.roomUserCount({
      room_id: client.gameRoom.id,
    });

    if (playerCount >= client.gameRoom.size) throw new WsRoomFullException();

    await this.roomUserService.upsertRoomUser(
      client.gameRoom,
      client.user,
      ConnectionRoomUserStatusEnum.CONNECTED,
    );
  }
}
