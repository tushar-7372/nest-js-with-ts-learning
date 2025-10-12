import { Body, Controller , Post , UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

// importing CurrentUser decorator to get the current user
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';

@Controller('reports')
export class ReportsController {

    constructor(private reportsService : ReportsService){
    }

    @Post()
    @UseGuards(AuthGuard)
    createReport(@Body() body : CreateReportDto , @CurrentUser() currentUser : User){
        // to save the current user's data with report , we are making use of the 2nd parameter

        // currently , it returns the report created and the user data ( including password ) as api response which is not ideal
        return this.reportsService.create(body , currentUser);
    }
}
