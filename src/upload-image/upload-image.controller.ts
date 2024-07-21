import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadImageService } from './upload-image.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('file-upload')
@Controller('upload')
export class UploadImageController {
  constructor(private readonly uploadService: UploadImageService) { }

  @Post('image/:id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiResponse({ status: 201, description: 'Image successfully uploaded' })
  async uploadImage(@UploadedFile() image: Express.Multer.File, @Param('id') productId: string) {
    const result = await this.uploadService.updateProductImage(image, productId);
    return result;
  }
}


