import {
  LuSettings, LuSearch, LuLink2, LuChartColumn,
  LuWorkflow, LuBot, LuShoppingBag, LuTrendingUp, LuMic,
  LuTarget, LuVideo, LuShoppingCart,
} from 'react-icons/lu';
import './GlassCard.css';

const icons = {
  settings: LuSettings,
  search: LuSearch,
  link: LuLink2,
  chart: LuChartColumn,
  workflow: LuWorkflow,
  bot: LuBot,
  bag: LuShoppingBag,
  trending: LuTrendingUp,
  mic: LuMic,
  target: LuTarget,
  video: LuVideo,
  cart: LuShoppingCart,
};

function GlassCard({ icon, emoji, title, description, number }) {
  const Icon = icon ? icons[icon] : null;

  return (
    <div className="glass-card">
      {number && <span className="glass-card__num">{number}</span>}
      <div className="glass-card__icon-wrap">
        {emoji ? (
          <span className="glass-card__emoji">{emoji}</span>
        ) : Icon ? (
          <Icon className="glass-card__icon" aria-hidden="true" />
        ) : null}
      </div>
      <h3 className="glass-card__title">{title}</h3>
      {description && <p className="glass-card__desc">{description}</p>}
      <div className="glass-card__line" />
    </div>
  );
}

export default GlassCard;
