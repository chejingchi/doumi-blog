import { Autowired, Component, Logger, ApplicationLifecycle, Application } from '@malagu/core';
// import { BlogServiceSymbol, BlogService } from './services/index';

const CronJob = require('cron').CronJob;

@Component(ApplicationLifecycle)
export class DouMiApplicationLifecycle implements ApplicationLifecycle<Application> {
  @Autowired(Logger)
  protected readonly logger: Logger;

  protected job: any;

  async onStart(app: Application): Promise<void> {
    var job = new CronJob('0 24 */1 * * *', async () => {
      try {
        // await this.blogService.clearTodayIpsArray()
        this.logger.info(`schedule trigger at ${new Date()} for clearing the visitor ips`)
      } catch (err) {
        console.error(err)
      }
    }, null, true);
    job.start();
  }

  onStop(app: Application): void {
    this.job.stop();
  }

}
