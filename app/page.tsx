import { openaiService } from '@/services/openai.service';

export default function Home() {
  openaiService.triggerCompetition();
  return <div>Home page</div>;
}
