import { defineMock } from '@alova/mock';
import Mock from 'mockjs';

export default defineMock({
  '[POST]/api/getUserInfo': () =>
    Mock.mock({
      code: 200,
      msg: 'success',
      data: {
        'id|1-10000': 100,
        name: '@cname',
        email: '@email',
        'age|1-100': 1,
        'headPicture|1': [
          'http://images.gongzuoshouji.cn/teacher/2021-08-09/84751fbcf153487f868a21a77048d19c.jpg',
          'http://images.gongzuoshouji.cn/teacher/20210804/196b0fa5d1726432492ad5edae6a565b.jpg',
          'http://images.gongzuoshouji.cn/teacher/20210730/a8e65bfaf7575a051a45b8dedd528af4.jpg'
        ]
      }
    })
});
