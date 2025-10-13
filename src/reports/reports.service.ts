import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';

import { User } from 'src/users/users.entity';

@Injectable()
export class ReportsService {

    constructor(@InjectRepository(Report) private repo : Repository<Report>){}

    // to save the current user's data with report , we are making use of the 2nd parameter
    // creating a report in db
    create(reportDto : CreateReportDto , user : User){
        const report = this.repo.create(reportDto);
        report.user = user;

        return this.repo.save(report);
    }

    async changeApproval(id : string, approved : boolean){
        const report = await this.repo.findOne({ where: { id: parseInt(id) } });

        if(!report){
            throw new NotFoundException('report with the given id not found');
        }

        report.approved = approved;
        return this.repo.save(report);
    }

}
