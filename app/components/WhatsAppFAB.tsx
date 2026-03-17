"use client"

import { DynamicWhatsAppLink } from "./DynamicWhatsAppLink"

export function WhatsAppFAB() {
  return (
    <>
      <style>{`
        .whatsapp-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .whatsapp-fab__tooltip {
          background: #fff;
          color: #111;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 20px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.13);
          white-space: nowrap;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }

        .whatsapp-fab:hover .whatsapp-fab__tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        .whatsapp-fab__btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 24px rgba(37,211,102,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          flex-shrink: 0;
          position: relative;
        }

        .whatsapp-fab__btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(37, 211, 102, 0.4);
          animation: wa-pulse 2.2s ease-out infinite;
        }

        .whatsapp-fab__btn:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 32px rgba(37,211,102,0.55);
        }

        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        @media (max-width: 480px) {
          .whatsapp-fab {
            bottom: 20px;
            right: 20px;
          }
          .whatsapp-fab__btn {
            width: 54px;
            height: 54px;
          }
        }
      `}</style>

      <div className="whatsapp-fab">
        <span className="whatsapp-fab__tooltip">Falar com especialista</span>
        <DynamicWhatsAppLink
          ariaLabel="Abrir conversa no WhatsApp"
          className="whatsapp-fab__btn"
        >
          {/* WhatsApp SVG icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="white"
            aria-hidden="true"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.461 2.027 7.754L0 32l8.522-2.006A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.76-1.845l-.484-.288-5.061 1.192 1.24-4.917-.316-.503A13.272 13.272 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.199-2.354-1.162-2.72-1.295-.365-.133-.631-.199-.896.199-.266.398-1.029 1.295-1.261 1.561-.232.265-.465.298-.863.1-.398-.2-1.68-.619-3.2-1.977-1.183-1.056-1.981-2.36-2.213-2.758-.232-.398-.025-.614.174-.812.179-.179.398-.465.597-.698.199-.232.265-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.896-2.16-1.228-2.957-.323-.776-.651-.671-.896-.683l-.764-.013c-.266 0-.697.1-.1063.498-.365.398-1.395 1.362-1.395 3.321 0 1.96 1.428 3.854 1.627 4.12.199.265 2.81 4.29 6.809 6.018.952.411 1.695.657 2.274.841.955.304 1.825.261 2.513.158.767-.114 2.354-.962 2.687-1.891.332-.93.332-1.726.232-1.891-.099-.166-.365-.265-.763-.465z" />
          </svg>
        </DynamicWhatsAppLink>
      </div>
    </>
  )
}
