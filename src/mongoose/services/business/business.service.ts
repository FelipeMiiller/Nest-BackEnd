import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusinessDto } from 'src/mongoose/dto/business.dto';
import { BusinessModel } from 'src/mongoose/models/business.model';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel('Business')
    private readonly businessModel: Model<BusinessModel>,
  ) {}

  public async created(businessDto: BusinessDto): Promise<BusinessModel> {
    const businessSave = await this.findByDocument(businessDto.document);
    if (!businessSave) {
      const businessSave = new this.businessModel(businessDto);

      return businessSave.save();
    } else {
      throw new Error('Business already exists.');
    }
  }

  public async findByDocument(document: string): Promise<any> {
    const business = await this.businessModel.findOne({ document });

    if (!business) {
      return false;
    } else {
      return business;
    }
  }

  public async findById(id: string): Promise<any> {
    const business = await this.businessModel.findById({ id });

    if (!business) {
      return false;
    } else {
      return business;
    }
  }
}
