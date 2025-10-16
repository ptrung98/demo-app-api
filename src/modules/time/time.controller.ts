import { Controller, Get } from '@nestjs/common';

@Controller('time')
export class TimeController {
    @Get()
    getServerTime() {
        return {
            success: true,
            data: {
                serverTime: Date.now()
            },
        };
    }
}
